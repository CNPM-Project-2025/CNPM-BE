import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional } from 'class-validator';
import { PurchaseOrderStatus } from 'src/constants/purchase_order_status';

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
