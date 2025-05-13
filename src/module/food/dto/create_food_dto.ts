import { IsString, IsNumber, IsOptional, IsInt, Min } from 'class-validator';

export class CreateFoodDto {
  @IsString()
  name: string;

  @IsNumber()
  @Min(0)
  sell_price: number;

  @IsNumber()
  @Min(0)
  import_price: number;

  @IsString()
  @IsOptional()
  description: string;

  @IsInt()
  @IsOptional()
  @Min(0)
  status: number;

  @IsInt()
  @Min(0)
  stock: number;

  @IsInt()
  @Min(1)
  categoryId: number;
}
