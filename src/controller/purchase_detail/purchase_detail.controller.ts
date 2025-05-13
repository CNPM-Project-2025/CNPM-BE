import { Body, Controller, Delete, Param, Put } from '@nestjs/common';
import { UpdatePurchaseOrderDetailDto } from 'src/dto/purchase_detail/update_purchase_order_detail_dto';
import { PurchaseDetailService } from 'src/service/purchase_detail/purchase_detail.service';
import { DeleteResult, UpdateResult } from 'typeorm';

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
