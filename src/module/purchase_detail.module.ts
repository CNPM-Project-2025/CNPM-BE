import { Module } from '@nestjs/common';
import { PurchaseDetailController } from '../controller/purchase_detail/purchase_detail.controller';
import { PurchaseDetailService } from '../service/purchase_detail/purchase_detail.service';
import { PurchaseOrder } from 'src/entities/purchase.entity';
import { PurchaseOrderDetail } from 'src/entities/purchase_order_detail.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { PurchaseOrderService } from 'src/service/purchase/purchase.service';
import { Supplier } from 'src/entities/supplier.entity';
import { SupplierService } from 'src/service/supplier/supplier.service';
import { User } from 'src/entities/user.entity';
import { FoodItem } from 'src/entities/fooditem.entity';

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
