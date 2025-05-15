import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PurchaseOrderService } from 'src/module/purchase/purchase.service';
import { CreatePurchaseOrderDto } from 'src/module/purchase/dto/create_purchase_order_dto';
import { PurchaseOrder } from 'src/module/purchase/entities/purchase.entity';
import { AuthGuard } from 'src/module/auth/auth-guard';
import { DeleteResult, LessThanOrEqual, Like, MoreThanOrEqual, UpdateResult } from 'typeorm';
import { Public } from 'src/module/auth/decorator/public.decorator';
import { Roles } from 'src/module/auth/decorator/roles.decorator';
import { UpdatePurchaseOrderDto } from './dto/update_purchase_order_dto';
import { PurchaseOrderStatus } from 'src/constants/purchase_order_status';

@Controller('purchase')
export class PurchaseController {
  constructor(private purchaseOrderService: PurchaseOrderService) { }

  @Post()
  // @Public()
  create(
    @Req() req: any,
    @Body() createPurchaseOrderDto: CreatePurchaseOrderDto,
  ): Promise<PurchaseOrder> {
    return this.purchaseOrderService.create(
      createPurchaseOrderDto,
      req.user_id,
    );
  }

  @Put(':id')
  @Roles('Admin', 'User')
  update(
    @Param('id') id: string,
    @Body() updatePurchaseOrderDto: UpdatePurchaseOrderDto,
  ): Promise<UpdateResult> {
    return this.purchaseOrderService.update(Number(id), updatePurchaseOrderDto);
  }

  @Delete(':id')
  @Roles('Admin', 'User')
  delete(@Param('id') id: string): Promise<DeleteResult> {
    return this.purchaseOrderService.delete(Number(id));
  }

  @Get(':id')
  @Public()
  findById(@Param('id') id: string): Promise<any> {
    return this.purchaseOrderService.findById(Number(id));
  }

  @Get()
  @Public()
  async findAll(
    // @Req() req: any,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('search') search: string,
    @Query('search_by') searchBy: string,
    @Query('min_price') minPrice: number,
    @Query('max_price') maxPrice: number,
    @Query('status') status: PurchaseOrderStatus,
  ): Promise<any> {
    console.log(page, limit, search, searchBy, minPrice, maxPrice, status);
    const pageNumber = page || 1;
    const limitNumber = limit || 10;

    // Gọi service để lấy dữ liệu
    const { data, total } = await this.purchaseOrderService.findAll(
      pageNumber,
      limitNumber,
      search,
      searchBy,
      minPrice ? (minPrice) : -1,
      maxPrice ? (maxPrice) : -1,
      status,
    );
    return {
      data: data,
      total: total,
      page: pageNumber,
      limit: limitNumber,
      lastpage: Math.ceil(total / limitNumber),
    };
  }
}
