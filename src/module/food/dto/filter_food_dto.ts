import { IsOptional, IsString, Min, ValidateIf } from 'class-validator';
import { Type } from 'class-transformer';

export class FilterFoodDto {
  @IsOptional()
  @IsString()
  page: string;

  @IsOptional()
  @IsString()
  item_per_page: string;

  @IsOptional()
  @IsString()
  search: string;

  @IsOptional()
  @IsString()
  search_by: string;

  @IsOptional()
  @IsString()
  category: string;

  @IsOptional()
  @Type(() => Number) // Chuyển đổi thành number
  @Min(0)
  @ValidateIf((o) => o.max_price !== undefined)
  min_price?: number;

  @IsOptional()
  @Type(() => Number) // Chuyển đổi thành number
  @Min(0)
  @ValidateIf((o) => o.min_price !== undefined)
  max_price?: number;
}
