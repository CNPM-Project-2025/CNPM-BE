import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Category } from '../category/entities/category.entity';
import { FoodItem } from '../food/entities/fooditem.entity';
import { FoodService } from '../food/food.service';
import { PurchaseOrderDetail } from '../purchase_detail/entities/purchase_order_detail.entity';
import { PurchaseDetailService } from '../purchase_detail/purchase_detail.service';
import { Supplier } from '../supplier/entities/supplier.entity';
import { SupplierService } from '../supplier/supplier.service';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { PurchaseOrder } from './entities/purchase.entity';
import { PurchaseController } from './purchase.controller';
import { PurchaseOrderService } from './purchase.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PurchaseOrder,
      PurchaseOrderDetail,
      Supplier,
      User,
      FoodItem,
      Category, // Thêm Category để cung cấp CategoryRepository
    ]),
    ConfigModule,
  ],
  controllers: [PurchaseController],
  providers: [
    PurchaseOrderService,
    FoodService,
    UserService,
    SupplierService,
    PurchaseDetailService,
  ],
})
export class PurchaseModule {}
