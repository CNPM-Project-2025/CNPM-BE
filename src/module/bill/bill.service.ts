import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bill } from './entities/bill.entity';
import { CreateBillDto, UpdateBillDto } from '../bill/dto/create_bill_dto';
import { OrderDetail } from '../order_detail/entities/order_detail.entity';
import { FoodItem } from '../food/entities/fooditem.entity';
import { min } from 'class-validator';
import { Table } from '../table/entities/table.entity';
import { BillStatus } from 'src/constants/bill_status';
import { OrderStatus } from 'src/constants/order_status';

@Injectable()
export class BillService {
  constructor(
    @InjectRepository(Bill)
    private billRepository: Repository<Bill>,
    @InjectRepository(OrderDetail)
    private orderdetailRepository: Repository<OrderDetail>,
    @InjectRepository(FoodItem)
    private foodItemRepository: Repository<FoodItem>,
    @InjectRepository(Table)
    private tableRepository: Repository<Table>,
  ) { }

  async getBillsWithPagination(page: number, limit: number, search: string, searchBy: string, min_price: number, max_price: number) {
    const queryBuilder = this.billRepository.createQueryBuilder('bill');

    // Thêm điều kiện tìm kiếm theo trường cụ thể nếu có
    if (search && searchBy) {
      if (searchBy === 'id') {
        queryBuilder.andWhere('bill.id LIKE :search', { search: `%${ Number(search) }%` });
        console.log('searchBy id');
      } else if (searchBy === 'paymentMethod') {
        queryBuilder.andWhere('bill.paymentMethod LIKE :search', { search: `%${search}%` });
      }
      // Bạn có thể thêm nhiều điều kiện tìm kiếm khác theo nhu cầu
    }
    if (min_price && max_price && min_price < max_price) {
      queryBuilder.andWhere('bill.totalPrice BETWEEN :min_price AND :max_price', { min_price, max_price });
    }
    // Phân trang
    queryBuilder.skip((page - 1) * limit).take(limit);
    // trả về hóa đơn và bao gồm cả chi tiết hóa đơn
    queryBuilder.leftJoinAndSelect('bill.orderDetails', 'orderDetail');
    queryBuilder.leftJoinAndSelect('orderDetail.foodItem', 'foodItem');
    queryBuilder.leftJoinAndSelect('bill.table', 'table');
    // Sắp xếp theo id hóa đơn giảm dần
    queryBuilder.orderBy('bill.id', 'DESC');
    const [data, total] = await queryBuilder.getManyAndCount();

    return {
      data,
      total,
      lastpage: Math.ceil(total / limit),
    };
  }

  async createBill(createBillDto: CreateBillDto): Promise<Bill> {
    console.log('createBillDto', createBillDto);
    const bill = this.billRepository.create(createBillDto);
    // console.log('bill', bill);
    const table = await this.tableRepository.findOneBy({
      id: createBillDto.tableId,
    });
    
    if (!table) {
      this.billRepository.delete(bill.id); // Xóa hóa đơn nếu không tìm thấy bảng
      throw new Error(`Table with id ${createBillDto.tableId} not found`);
    }

    bill.table = table; // Thiết lập mối quan hệ với bảng

    await this.billRepository.save(bill);
    // Lưu các chi tiết hóa đơn
    for (const orderDetail of createBillDto.orderDetails) {
      const orderDetailEntity = this.orderdetailRepository.create(orderDetail);
      orderDetailEntity.bill = bill; // Thiết lập mối quan hệ
      const foodItem = await this.foodItemRepository.findOneBy({
        id: orderDetail.foodItemId,
      });
      if (!foodItem) {
        // this.billRepository.delete(bill.id); // Xóa hóa đơn nếu không tìm thấy món ăn
        throw new Error(`FoodItem with id ${orderDetail.foodItemId} not found`);
      }
      orderDetailEntity.foodItem = foodItem;
      foodItem.stock -= orderDetail.quantity; // Giảm số lượng tồn kho
      if (foodItem.stock < 0) {
        // this.billRepository.delete(bill.id); // Xóa hóa đơn nếu không đủ hàng
        throw new Error(`Not enough stock for FoodItem with id ${orderDetail.foodItemId}`);
      }
      await this.orderdetailRepository.save(orderDetailEntity);
      await this.foodItemRepository.save(foodItem);
    }

    return bill;
  }

  // update
  async updateBill(id: number, updateBillDto: UpdateBillDto): Promise<Bill> {
    const bill = await this.billRepository.findOneBy({ id });
    if (!bill) {
      throw new Error(`Bill with id ${id} not found`);
    }

    // Chỉ cập nhật trạng thái (status)
    if (updateBillDto.status !== undefined) {
      bill.status = updateBillDto.status;
    }

    await this.billRepository.save(bill);
    return bill;
  }

  async getBillById(id: number): Promise<Bill> {
    
    const bill = await this.billRepository.findOne({
      where: { id },
      relations: ['orderDetails', 'orderDetails.foodItem', 'table'],
    });
    if (!bill) {
      throw new Error(`Bill with id ${id} not found`);
    }
    return bill;
  }

  async getAllBills(): Promise<Bill[]> {
    return await this.billRepository.find({
      relations: ['orderDetails', 'orderDetails.foodItem', 'table'],
    });
  }

  async getbillbystatus(): Promise<Bill[]> {
    const status = BillStatus.PAID;
    return await this.billRepository.find({
      where: { status },
      // ẩn các chi tiết hóa đơn đã hoàn thành 
      relations: ['orderDetails', 'orderDetails.foodItem', 'table'],
    });
  }

  async UpdateStatusOrderdetail(id: number, status: OrderStatus): Promise<OrderDetail> {
    const orderDetail = await this.orderdetailRepository.findOneBy({ id });
    if (!orderDetail) {
      throw new Error(`OrderDetail with id ${id} not found`);
    }
    orderDetail.status = status;
    await this.orderdetailRepository.save(orderDetail);
    return orderDetail;
  }

  async deleteBill(id: number): Promise<void> {
    await this.billRepository.delete(id);
  }
}
