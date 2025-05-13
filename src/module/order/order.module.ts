import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Table } from 'typeorm';
import { BillService } from '../bill/bill.service';
import { Bill } from '../bill/entities/bill.entity';
import { FoodItem } from '../food/entities/fooditem.entity';
import { TableService } from '../table/table.service';
import { OrderDetail } from './entities/order_detail.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Table, FoodItem, OrderDetail, Bill]),
    ConfigModule,
  ],
  controllers: [OrderController],
  providers: [OrderService, TableService, OrderService, BillService],
})
export class OrderModule {}
