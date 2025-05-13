import { Module } from '@nestjs/common';
import { FoodController } from 'src/controller/food/food.controller';
import { FoodService } from 'src/service/food/food.service';
import { ConfigModule } from '@nestjs/config';
import { FoodItem } from 'src/entities/fooditem.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryService } from 'src/service/category/category.service';
import { Category } from 'src/entities/category.entity';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FoodItem, Category, User]), ConfigModule],
  controllers: [FoodController],
  providers: [FoodService, CategoryService],
})
export class FoodModule {}
