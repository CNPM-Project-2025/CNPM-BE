import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
  BadRequestException,
  Param,
  Req,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Repository,
  DataSource,
  In,
  UpdateResult,
  DeleteResult,
  Like,
  MoreThanOrEqual,
  LessThanOrEqual,
} from 'typeorm';
import { PurchaseOrder } from '../../entities/purchase.entity';
import { Supplier } from '../../entities/supplier.entity';
import { User } from '../../entities/user.entity';
import { FoodItem } from '../../entities/fooditem.entity';
import { PurchaseOrderDetail } from '../../entities/purchase_order_detail.entity';
import { CreatePurchaseOrderDto } from '../../dto/purchase/create_purchase_order_dto';
import { PurchaseOrderStatus } from '../../constants/purchase_order_status';
import { UpdatePurchaseOrderDto } from '../../dto/purchase/update_purchase_order_dto';

@Injectable()
export class PurchaseOrderService {
  constructor(
    @InjectRepository(PurchaseOrder)
    private purchaseOrderRepository: Repository<PurchaseOrder>,
    @InjectRepository(Supplier)
    private supplierRepository: Repository<Supplier>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(FoodItem)
    private foodItemRepository: Repository<FoodItem>,
    @InjectRepository(PurchaseOrderDetail)
    private purchaseOrderDetailRepository: Repository<PurchaseOrderDetail>,
    private dataSource: DataSource,
  ) {}

  async create(
    createPurchaseOrderDto: CreatePurchaseOrderDto,
    userId: number,
  ): Promise<PurchaseOrder> {
    // Validate request body
    if (!createPurchaseOrderDto) {
      throw new HttpException(
        'Request body is undefined',
        HttpStatus.BAD_REQUEST,
      );
    }

    const { details } = createPurchaseOrderDto;

    if (
      !details ||
      !Array.isArray(details) ||
      details.length === 0
    ) {
      throw new HttpException(
        'Invalid request body: details are required',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Validate User
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // Validate FoodItems
    const foodItemIds = details.map((detail) => detail.foodItemId);
    const foodItems = await this.foodItemRepository.findBy({
      id: In(foodItemIds),
    });

    const foundFoodItemIds = foodItems.map((item) => item.id);
    for (const detail of details) {
      if (!foundFoodItemIds.includes(detail.foodItemId)) {
        throw new NotFoundException(
          `FoodItem with ID ${detail.foodItemId} not found`,
        );
      }
    }

    try {
      // Tạo PurchaseOrder
      const purchaseOrder = await this.purchaseOrderRepository.save({
        user: user as User,
        status: PurchaseOrderStatus.PENDING,
      });

      // Tạo PurchaseOrderDetails
      const purchaseOrderDetails = details.map((detail) => {
        var foodItem = foodItems.filter((x) => x.id === detail.foodItemId)[0];
        const detailEntity = new PurchaseOrderDetail();
        detailEntity.product = foodItem; // Sửa từ product thành foodItem
        detailEntity.quantity = detail.quantity;
        detailEntity.purchaseOrder = purchaseOrder;
        detailEntity.price = detail.price; // Lưu giá tại thời điểm nhập
        return detailEntity;
      });

      const result =
        await this.purchaseOrderDetailRepository.save(purchaseOrderDetails);
      return purchaseOrder;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        `Cannot create purchase order: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(
    id: number,
    updatePurchaseOrderDto: UpdatePurchaseOrderDto,
  ): Promise<UpdateResult> {
    const purchaseOrder = await this.purchaseOrderRepository.findOne({
      where: { id },
      relations: ['purchaseOrderDetails', 'purchaseOrderDetails.product'],
    });
    if (!purchaseOrder) {
      throw new NotFoundException(`purchaseOrder with ID ${id} not found`);
    }
    // Transaction
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Cập nhật PurchaseOrder
      const updateResult = await queryRunner.manager.update(
        PurchaseOrder,
        id,
        updatePurchaseOrderDto,
      );

      // Nếu status = COMPLETED, tăng FoodItem.stock
      if (updatePurchaseOrderDto.status === PurchaseOrderStatus.COMPLETED) {
        for (const purchaseOrderDetail of purchaseOrder.purchaseOrderDetails) {
          const foodItem = purchaseOrderDetail.product;
          if (!foodItem) {
            throw new BadRequestException(
              `FoodItem not found for PurchaseOrderDetail ID ${purchaseOrderDetail.id}`,
            );
          }
          const addQuantity = purchaseOrderDetail.quantity;
          await queryRunner.manager.update(FoodItem, foodItem.id, {
            stock: () => `stock + ${addQuantity}`,
          });
        }
      }

      // Commit transaction
      await queryRunner.commitTransaction();
      return updateResult;
    } catch (error) {
      // Rollback transaction
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(
        `Failed to update PurchaseOrder: ${error.message}`,
      );
    } finally {
      // Release query runner
      await queryRunner.release();
    }
  }

  async delete(id: number): Promise<DeleteResult> {
    const purchaseOrder = await this.purchaseOrderRepository.findOne({
      where: { id },
      relations: ['purchaseOrderDetails', 'purchaseOrderDetails.product'],
    });

    if (!purchaseOrder) {
      throw new NotFoundException(`PurchaseOrder with ID ${id} not found`);
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      if (purchaseOrder.status === PurchaseOrderStatus.COMPLETED) {
        // Revert FoodItem stock
        for (const detail of purchaseOrder.purchaseOrderDetails) {
          const foodItem = detail.product;
          foodItem.stock -= detail.quantity;
          if (foodItem.stock < 0) {
            throw new BadRequestException(
              `Cannot delete PurchaseOrder: Insufficient stock for FoodItem ${foodItem.id}`,
            );
          }
          await queryRunner.manager.save(FoodItem, foodItem);
        }
      }

      // Delete the PurchaseOrder
      purchaseOrder.status = PurchaseOrderStatus.REJECTED;
      await queryRunner.manager.save(PurchaseOrder, purchaseOrder);
      await queryRunner.commitTransaction();

      return { affected: 1, raw: {} };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(
        `Failed to delete PurchaseOrder: ${error.message}`,
      );
    } finally {
      await queryRunner.release();
    }
  }

  async findById(id: number): Promise<any> {
    return this.purchaseOrderRepository.findOneBy({ id });
  }


  async findAll(
    page: number,
    limit: number,
    search: string,
    searchBy: string,
    minPrice: number,
    maxPrice: number,
  ): Promise<any> {
    const whereConditions: any = {};

    // Thêm điều kiện tìm kiếm nếu có
    if (search) {
      whereConditions[searchBy] = Like(`%${search}%`);
    }

    // Thêm điều kiện minPrice nếu có
    if (minPrice !== -1) {
      whereConditions.price = MoreThanOrEqual(minPrice);
    }

    // Thêm điều kiện maxPrice nếu có
    if (maxPrice !== -1) {
      whereConditions.price = LessThanOrEqual(maxPrice);
    }

    // Tìm tất cả các đơn hàng với các điều kiện đã thiết lập
    return this.purchaseOrderRepository.find({
      relations: ['purchaseOrderDetails', 'purchaseOrderDetails.product', 'user'],
      select: {
        user: {
          id: true,
          first_name: true,
          last_name: true,
          email: true,
        },  // Chọn chỉ các trường cần thiết từ bảng user
      },
      skip: (page - 1) * limit, // Xác định điểm bắt đầu dữ liệu
      take: limit, // Số lượng bản ghi trên mỗi trang
      where: whereConditions, // Điều kiện tìm kiếm
    });
  }
}