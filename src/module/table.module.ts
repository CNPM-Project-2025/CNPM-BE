import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TableController } from 'src/controller/table/table.controller';
import { Table } from 'src/entities/table.entity';
import { TableService } from 'src/service/table/table.service';

@Module({
  imports: [TypeOrmModule.forFeature([Table]), ConfigModule],
  providers: [TableService],
  controllers: [TableController],
  exports: [TableService], // Thêm nếu cần dùng CategoryService ở module khác
})
export class TableModule {}
