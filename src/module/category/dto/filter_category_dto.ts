import { IsOptional, IsString } from 'class-validator';

export class FilterCategoryDto {
  @IsOptional()
  @IsString()
  page: string;

  @IsOptional()
  @IsString()
  item_per_page: string;

  @IsOptional()
  @IsString()
  search: string;
}
