import { IsInt, Min, IsArray, ValidateNested, IsNumber } from 'class-validator';

export class CreateOrderDetailDto {
  @IsInt()
  @Min(1)
  foodItemId: number;

  @IsInt()
  @Min(1)
  quantity: number;
}
