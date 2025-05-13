import { Category } from "src/module/category/entities/category.entity";


export class UpdateFoodDto {
  name: string;

  sell_price: number;

  description: string;

  category: Category;

  status: number;
}
