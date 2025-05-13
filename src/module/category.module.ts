import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryService } from 'src/service/category/category.service';
import { CategoryController } from '../controller/category/category.controller';
import { Category } from '../entities/category.entity';
import { ConfigModule } from '@nestjs/config';
import { User } from 'src/entities/user.entity';
import { TableModule } from './table.module';
import { OrderModule } from './order.module';
import { OrderDetailModule } from './order_detail/order_detail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category, User]),
    ConfigModule,
    TableModule,
    OrderModule,
    OrderDetailModule, // Thêm để cung cấp Repository<Category>
  ],
  providers: [CategoryService],
  controllers: [CategoryController],
  exports: [CategoryService], // Thêm nếu cần dùng CategoryService ở module khác
})
export class CategoryModule {}
