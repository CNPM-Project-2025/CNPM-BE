import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { Public } from 'src/auth/decorator/public.decorator';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { CreateTableDto } from 'src/dto/table/create_table_dto';
import { FilterTableDto } from 'src/dto/table/filter_table_dto';
import { Table } from 'src/entities/table.entity';
import { TableService } from 'src/service/table/table.service';
import { UpdateResult } from 'typeorm';

@Controller('table')
export class TableController {
  constructor(private tableService: TableService) {}

  @Post()
  @Roles('Admin')
  create(@Body() createTableDto: CreateTableDto): Promise<Table> {
    return this.tableService.create(createTableDto);
  }

  @Get()
  @Public()
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'items_per_page', required: false })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({
    name: 'search_by',
    required: false,
    enum: ['status', 'capcity'],
  }) // Chỉ định các trường hợp lệ
  findAll(@Query() query: FilterTableDto): Promise<any> {
    return this.tableService.findAll(query);
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<any> {
    return this.tableService.findById(Number(id));
  }
}
