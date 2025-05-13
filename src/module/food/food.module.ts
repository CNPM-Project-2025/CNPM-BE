import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryService } from '../category/category.service';
import { Category } from '../category/entities/category.entity';
import { User } from '../user/entities/user.entity';
import { FoodItem } from './entities/fooditem.entity';
import { FoodController } from './food.controller';
import { FoodService } from './food.service';


@Module({
  imports: [TypeOrmModule.forFeature([FoodItem, Category, User]), ConfigModule],
  controllers: [FoodController],
  providers: [FoodService, CategoryService],
})
export class FoodModule {}
