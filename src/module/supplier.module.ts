import { Module } from '@nestjs/common';
import { SupplierController } from '../controller/supplier/supplier.controller';
import { SupplierService } from '../service/supplier/supplier.service';
import { Supplier } from 'src/entities/supplier.entity';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Supplier, User]), ConfigModule],
  controllers: [SupplierController],
  providers: [SupplierService],
})
export class SupplierModule {}
