import { Module } from '@nestjs/common';
import { UserController } from '../controller/user/user.controller';
import { UserService } from '../service/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { OrderController } from 'src/controller/order/order.controller';
import { OrderService } from 'src/service/order/order.service';
import { Table } from 'src/entities/table.entity';
import { FoodItem } from 'src/entities/fooditem.entity';
import { TableService } from 'src/service/table/table.service';
import { OrderDetail } from 'src/entities/order_detail.entity';
import { Bill } from 'src/entities/bill.entity';
import { BillService } from 'src/service/bill/bill.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Table, FoodItem, OrderDetail, Bill]),
    ConfigModule,
  ],
  controllers: [OrderController],
  providers: [OrderService, TableService, OrderService, BillService],
})
export class OrderModule {}
