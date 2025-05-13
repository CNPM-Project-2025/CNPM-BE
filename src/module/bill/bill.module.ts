import { Module } from '@nestjs/common';
import { BillController } from './bill.controller';
import { BillService } from './bill.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bill } from './entities/bill.entity';
import { OrderDetail } from '../order_detail/entities/order_detail.entity';
import { FoodItem } from '../food/entities/fooditem.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Bill]),
        TypeOrmModule.forFeature([OrderDetail]),
        TypeOrmModule.forFeature([FoodItem]),
    ],
    controllers: [BillController],
    providers: [BillService],
    exports: [BillService],
})
export class BillModule { }
