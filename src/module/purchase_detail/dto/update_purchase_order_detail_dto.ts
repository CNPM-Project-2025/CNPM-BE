import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, Min } from 'class-validator';

export class UpdatePurchaseOrderDetailDto {
  @IsInt()
  @Min(1)
  quantity: number;
}
