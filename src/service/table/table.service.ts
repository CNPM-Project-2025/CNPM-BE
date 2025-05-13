import { Injectable, NotFoundException, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository, UpdateResult } from 'typeorm';
import { Table } from 'src/entities/table.entity';
import { urlToQRCode } from 'helpers/qr_util';
import { CreateTableDto } from 'src/dto/table/create_table_dto';
import { FilterUserDto } from 'src/dto/user/filter_user_dto';
import { OrderStatus } from 'src/constants/order_status';
import { TableStatus } from 'src/constants/table_status';

@Injectable()
export class TableService {
  constructor(
    @InjectRepository(Table)
    private tableRepository: Repository<Table>,
  ) {}

  async create(createTableDto: CreateTableDto): Promise<Table> {
    console.log(CreateTableDto);
    const newTable = await this.tableRepository.save(createTableDto);

    // Tạo URL QR code với id
    const baseUrl = process.env.BASE_URL || 'http://localhost:9999';
    const qrCodeUrl = `${baseUrl}/table/${newTable.id}/order`;

    const base64 = (await this.generateQRCode(newTable.id)).qrCodeBase64;

    // Cập nhật qr_code
    newTable.qr_code = qrCodeUrl;
    return this.tableRepository.save(newTable);
  }

  async generateQRCode(
    tableId: number,
  ): Promise<{ qrCodeUrl: string; qrCodeBase64: string }> {
    const table = await this.tableRepository.findOne({
      where: { id: tableId },
    });
    if (!table) {
      throw new NotFoundException(`Table with ID ${tableId} not found`);
    }

    const baseUrl = process.env.BASE_URL || 'http://localhost:9999';
    const qrCodeUrl = `${baseUrl}/table/${tableId}/order`;
    const qrCodeBase64 = await urlToQRCode(qrCodeUrl);

    table.qr_code = qrCodeUrl;
    await this.tableRepository.save(table);

    return { qrCodeUrl, qrCodeBase64 };
  }

  async getQRCode(
    tableId: number,
  ): Promise<{ qrCodeUrl: string; qrCodeBase64: string }> {
    const table = await this.tableRepository.findOne({
      where: { id: tableId },
    });
    if (!table) {
      throw new NotFoundException(`Table with ID ${tableId} not found`);
    }

    if (!table.qr_code) {
      throw new NotFoundException(`QR code for Table ${tableId} not generated`);
    }

    const qrCodeBase64 = await urlToQRCode(table.qr_code);
    return { qrCodeUrl: table.qr_code, qrCodeBase64 };
  }

  async findAll(@Query() query: FilterUserDto): Promise<any> {
    const items_per_page = Number(query.item_per_page) || 10;
    const page = Number(query.page) || 1;
    const skip = (page - 1) * items_per_page;
    const keyword = query.search || '';
    const searchBy = query.search_by || '';
    let whereCondition = {};
    if (keyword && searchBy) {
      if (['status', 'capcity'].includes(searchBy)) {
        whereCondition = { [searchBy]: Like(`%${keyword}%`) };
      } else {
        // Nếu search_by không hợp lệ, trả về lỗi hoặc tìm kiếm mặc định
        throw new Error(
          'Invalid search_by field. Use email, first_name, or phone_number.',
        );
      }
    }
    console.log(whereCondition);
    console.log('Search params:', { keyword, searchBy }); // Log keyword và searchBy
    const [res, total] = await this.tableRepository.findAndCount({
      where: whereCondition,
      order: { created_at: 'DESC' },
      take: items_per_page,
      skip: skip,
      select: ['id', 'qr_code', 'created_at', 'updated_at'],
    });
    const lastPage = Math.ceil(total / items_per_page);
    const nextPage = page + 1 > lastPage ? null : page + 1;
    const prevPage = page - 1 < 1 ? null : page - 1;

    return {
      data: res,
      total,
      currentPage: page,
      nextPage,
      prevPage,
      lastPage,
    };
  }
  findById(id: number): Promise<any> {
    return this.tableRepository.findOneBy({ id });
  }
}
