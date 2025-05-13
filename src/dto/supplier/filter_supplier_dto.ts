import { IsOptional, IsString } from 'class-validator';

export class FilterSupplierDto {
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
}
