import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { FoodItem } from '../food/entities/fooditem.entity';
import { PurchaseOrder } from '../purchase/entities/purchase.entity';
import { PurchaseOrderService } from '../purchase/purchase.service';
import { Supplier } from '../supplier/entities/supplier.entity';
import { PurchaseOrderDetail } from './entities/purchase_order_detail.entity';
import { PurchaseDetailController } from './purchase_detail.controller';
import { PurchaseDetailService } from './purchase_detail.service';
import { User } from '../user/entities/user.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      PurchaseOrder,
      PurchaseOrderDetail,
      Supplier,
      User,
      FoodItem,
    ]),
    ConfigModule,
  ],
  controllers: [PurchaseDetailController],
  providers: [PurchaseDetailService, PurchaseOrderService],
})
export class PurchaseDetailModule {}
