import { Type } from 'class-transformer';
import { IsArray, IsInt, Min, ValidateNested } from 'class-validator';
import { CreatePurchaseOrderDetailDto } from '../purchase_detail/create_purchase_order_detail_dto';

export class CreatePurchaseOrderDto {

  

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePurchaseOrderDetailDto)
  details: CreatePurchaseOrderDetailDto[];
}
