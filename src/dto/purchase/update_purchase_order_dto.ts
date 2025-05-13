import { ApiProperty } from '@nestjs/swagger';
import { PurchaseOrderStatus } from '../../constants/purchase_order_status';
import { IsEnum, IsInt, IsOptional } from 'class-validator';

export class UpdatePurchaseOrderDto {
  @ApiProperty({
    enum: PurchaseOrderStatus,
    description: 'Status of the purchase order',
    example: PurchaseOrderStatus.PENDING,
  })
  @IsEnum(PurchaseOrderStatus, {
    message: 'Status must be one of the valid purchase order statuses',
  })
  status: PurchaseOrderStatus;
}
