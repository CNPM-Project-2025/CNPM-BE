import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SupplierService } from '../../service/supplier/supplier.service';
import { ApiQuery } from '@nestjs/swagger';
import { FilterCategoryDto } from 'src/dto/category/filter_category_dto';
import { FilterSupplierDto } from '../../dto/supplier/filter_supplier_dto';
import { UpdateSupplierDto } from '../../dto/supplier/update_supplier_dto';
import { UpdateResult } from 'typeorm';
import { AuthGuard } from 'src/auth/auth-guard';
import { CreateSupplierDto } from '../../dto/supplier/create_supplier_dto';
import { Supplier } from 'src/entities/supplier.entity';
import { Roles } from 'src/auth/decorator/roles.decorator';

@Controller('supplier')
export class SupplierController {
  constructor(private supplierService: SupplierService) {}

  @Get()
  @Roles('Admin')
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'items_per_page', required: false })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({
    name: 'search_by',
    required: false,
    enum: ['name', 'address', 'phone'],
  })
  findAll(@Query() query: FilterSupplierDto): Promise<any> {
    return this.supplierService.findAll(query);
  }

  @Put(':id')
  @Roles('Admin')
  update(
    @Param('id') id: string,
    updateSupplierDto: UpdateSupplierDto,
  ): Promise<UpdateResult> {
    return this.supplierService.update(Number(id), updateSupplierDto);
  }

  @Get(':id')
  @Roles('Admin')
  findById(@Param('id') id: string): Promise<any> {
    return this.supplierService.findById(Number(id));
  }

  @Post()
  @Roles('Admin')
  create(
    @Req() req: any,
    @Body() createSupplierDto: CreateSupplierDto,
  ): Promise<Supplier> {
    return this.supplierService.create(createSupplierDto);
  }
}
