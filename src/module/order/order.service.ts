import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BillStatus } from 'src/constants/bill_status';
import { DataSource, Repository } from 'typeorm';
import { Table } from '../table/entities/table.entity'; // Ensure correct import path for Table entity
import { CreateBillDto } from '../bill/dto/create_bill_dto';
import { Bill } from '../bill/entities/bill.entity';
import { FoodItem } from '../food/entities/fooditem.entity';
import { CreateOrderDetailDto } from '../order_detail/dto/create_order_detail';
import { OrderDetail } from './entities/order_detail.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Table)
    private tableRepository: Repository<Table>,
    @InjectRepository(OrderDetail)
    private orderDetailRepository: Repository<OrderDetail>,
    @InjectRepository(Bill)
    private billRepository: Repository<Bill>,
    @InjectRepository(FoodItem)
    private foodItemRepository: Repository<FoodItem>,
    private readonly dataSource: DataSource,
  ) {}

  async getCurrentOrder(idTable: number): Promise<any> {
    return await this.billRepository.findOne({
      where: {
        table: { id: idTable },
        status: BillStatus.UNPAID,
      },
    });
  }

  async calculateTotalPrice(
    orderDetails: CreateOrderDetailDto[],
  ): Promise<number> {
    if (!orderDetails || orderDetails.length === 0) {
      throw new BadRequestException('Order details array cannot be empty');
    }

    let totalPrice = 0;

    for (const detail of orderDetails) {
      const food = await this.foodItemRepository.findOneBy({
        id: detail.foodItemId,
      });
      if (!food) {
        throw new NotFoundException(
          `Food with ID ${detail.foodItemId} not found`,
        );
      }
      const price = food.sell_price * detail.quantity;
      if (isNaN(price)) {
        throw new BadRequestException(
          `Invalid price or quantity for food item ID ${detail.foodItemId}`,
        );
      }
      totalPrice += price;
    }

    return parseFloat(totalPrice.toFixed(2));
  }

  /**
   * Xác nhận đơn hàng và tạo hóa đơn
   * @param idTable ID của bàn
   * @param createBillDto DTO chứa thông tin hóa đơn
   * @returns Hóa đơn đã tạo
   */
  async confirmOrder(
    // idTable: number,
    createBillDto: CreateBillDto,
  ): Promise<any> {
    // Kiểm tra bàn
    // if (!createBillDto.tableId) {
    //   throw new BadRequestException('Table ID is required');
    // }
    const table = await this.tableRepository.findOneBy({ id: createBillDto.tableId?.id });
    if (!table) {
      throw new NotFoundException(`Table with ID ${createBillDto.tableId} not found`);
    }

    // Kiểm tra orderDetails
    if (
      !createBillDto.orderDetails ||
      createBillDto.orderDetails.length === 0
    ) {
      throw new BadRequestException('Order details array cannot be empty');
    }

    // Tạo query runner cho transaction
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Tính tổng tiền
      const totalPrice = await this.calculateTotalPrice(
        createBillDto.orderDetails,
      );

      // Tạo bill
      const bill = this.billRepository.create({
        table: table,
        type: createBillDto.type,
        status: BillStatus.PAID,
        paymentMethod: createBillDto.paymentMethod,
        totalPrice,
      });
      await queryRunner.manager.save(Bill, bill);

      // Xử lý orderDetails
      for (const orderDetailDto of createBillDto.orderDetails) {
        // Kiểm tra FoodItem
        const food = await queryRunner.manager.findOne(FoodItem, {
          where: { id: orderDetailDto.foodItemId },
          lock: { mode: 'pessimistic_write' },
        });
        if (!food) {
          throw new NotFoundException(
            `Food with ID ${orderDetailDto.foodItemId} not found`,
          );
        }

        // Kiểm tra stock
        if (food.stock < orderDetailDto.quantity) {
          throw new BadRequestException(
            `Insufficient stock for food item ${food.name}`,
          );
        }

        // Tạo OrderDetail
        const orderDetail = this.orderDetailRepository.create({
          bill,
          foodItem: food,
          quantity: orderDetailDto.quantity,
        });
        await queryRunner.manager.save(OrderDetail, orderDetail);

        // Cập nhật stock
        food.stock -= orderDetailDto.quantity;
        await queryRunner.manager.save(FoodItem, food);
      }

      // Commit transaction
      await queryRunner.commitTransaction();

      // Trả về bill với quan hệ
      return await this.billRepository.findOne({
        where: { id: bill.id },
        relations: ['table', 'orderDetails', 'orderDetails.foodItem'],
      });
    } catch (error) {
      // Rollback nếu có lỗi
      await queryRunner.rollbackTransaction();
      throw error instanceof BadRequestException ||
        error instanceof NotFoundException
        ? error
        : new BadRequestException(`Failed to confirm order: ${error.message}`);
    } finally {
      // Giải phóng query runner
      await queryRunner.release();
    }
  }
}
