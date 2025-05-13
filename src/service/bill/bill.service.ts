import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bill } from 'src/entities/bill.entity';
import { CreateBillDto, UpdateBillDto } from 'src/dto/bill/create_bill_dto';
import { OrderDetail } from 'src/entities/order_detail.entity';
import { FoodItem } from 'src/entities/fooditem.entity';
import { min } from 'class-validator';

@Injectable()
export class BillService {
  constructor(
    @InjectRepository(Bill)
    private billRepository: Repository<Bill>,
    @InjectRepository(OrderDetail)
    private orderdetailRepository: Repository<OrderDetail>,
    @InjectRepository(FoodItem)
    private foodItemRepository: Repository<FoodItem>,
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
    const bill = this.billRepository.create(createBillDto);
    await this.billRepository.save(bill);
    // Lưu các chi tiết hóa đơn
    for (const orderDetail of createBillDto.orderDetails) {
      const orderDetailEntity = this.orderdetailRepository.create(orderDetail);
      orderDetailEntity.bill = bill; // Thiết lập mối quan hệ
      const foodItem = await this.foodItemRepository.findOneBy({
        id: orderDetail.foodItemId,
      });
      if (!foodItem) {
        throw new Error(`FoodItem with id ${orderDetail.foodItemId} not found`);
      }
      orderDetailEntity.foodItem = foodItem;
      await this.orderdetailRepository.save(orderDetailEntity);
    }

    return bill;
  }

  async getBillById(id: number): Promise<Bill> {
    const bill = await this.billRepository.findOneBy({ id });
    if (!bill) {
      throw new Error(`Bill with id ${id} not found`);
    }
    return bill;
  }

  async getAllBills(): Promise<Bill[]> {
    return await this.billRepository.find();
  }

  async deleteBill(id: number): Promise<void> {
    await this.billRepository.delete(id);
  }
}
