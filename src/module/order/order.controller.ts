import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/decorator/public.decorator';
import { CreateBillDto } from '../bill/dto/create_bill_dto';
import { TableService } from '../table/table.service';
import { OrderService } from './order.service';


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
