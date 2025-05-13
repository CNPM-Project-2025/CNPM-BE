import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dataSourceOption } from '../db/data-source';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './module/auth/auth-guard';
import { AuthModule } from './module/auth/auth.module';
import { RolesGuard } from './module/auth/role.guard';
import { BillModule } from './module/bill/bill.module';
import { CategoryModule } from './module/category/category.module';
import { FoodModule } from './module/food/food.module';
import { PurchaseModule } from './module/purchase/purchase.module';
import { PurchaseDetailModule } from './module/purchase_detail/purchase_detail.module';
import { QrCodeController } from './module/qr_code/qr_code.controller';
import { SupplierModule } from './module/supplier/supplier.module';
import { User } from './module/user/entities/user.entity';
import { UserModule } from './module/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(dataSourceOption),
    UserModule,
    AuthModule,
    CategoryModule,
    FoodModule,
    BillModule,
    SupplierModule,
    PurchaseModule,
    PurchaseDetailModule,
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AppController, QrCodeController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
