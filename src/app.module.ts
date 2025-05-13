import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './module/user.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './module/category.module';
import { FoodModule } from './module/food.module';
import { SupplierModule } from './module/supplier.module';
import { PurchaseModule } from './module/purchase.module';
import { PurchaseDetailModule } from './module/purchase_detail.module';
import { dataSourceOption } from '../db/data-source';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/role.guard';
import { AuthGuard } from './auth/auth-guard';
import { User } from './entities/user.entity';
import { QrCodeController } from './controller/qr_code/qr_code.controller';
import { Bill } from './entities/bill.entity';
import { BillModule } from './module/bill.module';

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
