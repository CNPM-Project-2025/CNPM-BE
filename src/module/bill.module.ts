import { Module } from '@nestjs/common';
import { BillController } from '../controller/bill/bill.controller';
import { BillService } from 'src/service/bill/bill.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bill } from 'src/entities/bill.entity';
import { OrderDetail } from 'src/entities/order_detail.entity';
import { FoodItem } from 'src/entities/fooditem.entity';

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
