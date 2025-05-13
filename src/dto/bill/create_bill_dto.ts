import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsOptional, ValidateNested } from 'class-validator';
import { OrderType } from 'src/constants/type_order';
import { PaymentMethod } from 'src/constants/type_payment';
import { CreateOrderDetailDto } from '../order_detail/create_order_detail';
import { BillStatus } from 'src/constants/bill_status';
import { Type } from 'class-transformer';

export class CreateBillDto {

  @IsOptional()
  tableId?: number;

  @IsOptional()
  @IsEnum(PaymentMethod)
  @ApiProperty({ enum: PaymentMethod, default: PaymentMethod.CASH })
  paymentMethod?: PaymentMethod;

  @IsOptional()
  @IsEnum(OrderType)
  @ApiProperty({ enum: OrderType, default: OrderType.DINE_IN })
  type?: OrderType;

  @IsOptional()
  totalPrice?: number;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderDetailDto)
  orderDetails: CreateOrderDetailDto[];
  price: any;
}

export class UpdateBillDto {
  @IsOptional()
  @IsEnum(BillStatus)
  @ApiProperty({ enum: BillStatus, default: BillStatus.UNPAID })
  status?: BillStatus;
}
