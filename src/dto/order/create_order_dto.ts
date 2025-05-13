import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsInt,
  IsOptional,
  IsPhoneNumber,
  Min,
  ValidateNested,
} from 'class-validator';
import { CreateOrderDetailDto } from '../order_detail/create_order_detail';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { OrderType } from 'src/constants/type_order';

export class CreateOrderDto {
 
}
