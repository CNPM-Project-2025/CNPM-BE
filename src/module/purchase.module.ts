import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { PurchaseController } from '../controller/purchase/purchase.controller';
import { PurchaseOrderService } from '../service/purchase/purchase.service';
import { FoodService } from 'src/service/food/food.service';
import { UserService } from '../service/user/user.service';
import { SupplierService } from '../service/supplier/supplier.service';
import { PurchaseDetailService } from '../service/purchase_detail/purchase_detail.service';
import { PurchaseOrder } from '../entities/purchase.entity';
import { PurchaseOrderDetail } from '../entities/purchase_order_detail.entity';
import { Supplier } from '../entities/supplier.entity';
import { User } from '../entities/user.entity';
import { FoodItem } from '../entities/fooditem.entity';
import { Category } from '../entities/category.entity';

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
