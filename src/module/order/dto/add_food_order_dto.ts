import { Type } from 'class-transformer';
import { IsArray, IsInt, Min, ValidateNested } from 'class-validator';
import { CreateOrderDetailDto } from 'src/module/order_detail/dto/create_order_detail';

export class AddFoodOrderDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderDetailDto)
  foods: CreateOrderDetailDto[];
}
