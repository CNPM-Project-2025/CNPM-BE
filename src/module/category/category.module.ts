import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryService } from './category.service';
import { ConfigModule } from '@nestjs/config';
import { CategoryController } from './category.controller';
import { Category } from './entities/category.entity';
import { OrderModule } from '../order/order.module';
import { OrderDetailModule } from '../order_detail/order_detail.module';
import { TableModule } from '../table/table.module';
import { User } from '../user/entities/user.entity';

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
