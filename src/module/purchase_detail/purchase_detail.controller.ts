import { Body, Controller, Delete, Param, Put } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UpdatePurchaseOrderDetailDto } from './dto/update_purchase_order_detail_dto';
import { PurchaseDetailService } from './purchase_detail.service';

@Controller('purchase-detail')
export class PurchaseDetailController {
  constructor(private purchaseDetailService: PurchaseDetailService) {}

  @Put(':id')
  async updateQuantity(
    @Param('id') id: string,
    @Body() updateDto: UpdatePurchaseOrderDetailDto,
  ): Promise<UpdateResult> {
    return this.purchaseDetailService.updateQuantity(
      Number(id),
      updateDto.quantity,
    );
  }
}
