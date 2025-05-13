import { ApiProperty } from '@nestjs/swagger';
import { PurchaseOrderStatus } from '../../constants/purchase_order_status';
import { IsEnum, IsInt, IsOptional, Min } from 'class-validator';

export class UpdatePurchaseOrderDetailDto {
  @IsInt()
  @Min(1)
  quantity: number;
}
