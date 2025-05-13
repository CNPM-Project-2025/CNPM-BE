import { IsInt, IsString } from 'class-validator';

export class UpdateCategoryDto {
  @IsString()
  name: string;

  @IsInt()
  status: number;

  @IsString()
  description: string;
}
