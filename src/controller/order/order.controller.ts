import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/decorator/public.decorator';
import { CreateBillDto } from 'src/dto/bill/create_bill_dto';
import { AddFoodOrderDto } from 'src/dto/order/add_food_order_dto';
import { Bill } from 'src/entities/bill.entity';
import { BillService } from 'src/service/bill/bill.service';
import { OrderService } from 'src/service/order/order.service';
import { TableService } from 'src/service/table/table.service';

@ApiTags('orders')
@Controller('table')
export class OrderController {
  constructor(
    private tableService: TableService,
    private orderService: OrderService,
  ) {}

  @Get(':idTable/order/qr')
  @Public()
  getQR(@Param('idTable') idTable: string): Promise<any> {
    // TODO: lay order hien tai
    return this.tableService.getQRCode(Number(idTable));
  }
  @Get(':idTable/order')
  @Public()
  getCurrenOrder(@Param('idTable') idTable: string): Promise<any> {
    return this.orderService.getCurrentOrder(Number(idTable));
  }

  @Post(':idTable/order/confirmOrder')
  @Public()
  confirmOrder(
    @Param('idTable') idTable: string,
    @Body() createBillDto: CreateBillDto,
  ): Promise<any> {
    return this.orderService.confirmOrder(createBillDto);
  }
}
