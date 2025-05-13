import { IsInt, Min, IsArray, ValidateNested, IsNumber } from 'class-validator';

export class CreatePurchaseOrderDetailDto {
  @IsInt()
  @Min(1)
  foodItemId: number;

  @IsNumber()
  @Min(0)
  price: number;

  @IsInt()
  @Min(1)
  quantity: number;
}
