import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
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

@Controller('purchase')
export class PurchaseController {
  constructor(private purchaseOrderService: PurchaseOrderService) {}

  @Post()
  @Public()
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
    @Param('page') page: string,
    @Param('limit') limit: string,
    @Param('search') search: string,
    @Param('search_by') searchBy: string,
    @Param('min_price') minPrice: string,
    @Param('max_price') maxPrice: string,
  ): Promise<any> {
    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 10;  

    // Gọi service để lấy dữ liệu
    const data = await this.purchaseOrderService.findAll(
      pageNumber,
      limitNumber,
      search,
      searchBy,
      minPrice ? parseFloat(minPrice) : -1,
      maxPrice ? parseFloat(maxPrice) : -1,
    );
    return {
      data: data,
      total: data.length,
      page: pageNumber,
      limit: limitNumber,
      lastpage: Math.ceil(data.length / limitNumber),
    }
  }
}
