import { Body, Injectable, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Supplier } from 'src/entities/supplier.entity';
import { Like, Repository, UpdateResult } from 'typeorm';
import { CreateSupplierDto } from '../../dto/supplier/create_supplier_dto';
import { UpdateSupplierDto } from '../../dto/supplier/update_supplier_dto';
import { FilterSupplierDto } from '../../dto/supplier/filter_supplier_dto';

@Injectable()
export class SupplierService {
  constructor(
    @InjectRepository(Supplier)
    private supplierRepository: Repository<Supplier>,
  ) {}

  async create(
    @Body() createSupplierDto: CreateSupplierDto,
  ): Promise<Supplier> {
    return await this.supplierRepository.save(createSupplierDto);
  }

  async findById(id: number): Promise<any> {
    return await this.supplierRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateSupplierDTO: UpdateSupplierDto,
  ): Promise<UpdateResult> {
    return await this.supplierRepository.update(id, updateSupplierDTO);
  }

  async findAll(@Query() query: FilterSupplierDto): Promise<any> {
    const items_per_page = Number(query.item_per_page) || 10;
    const page = Number(query.page) || 1;
    const skip = (page - 1) * items_per_page;
    const keyword = query.search || '';
    const searchBy = query.search_by || '';
    let whereCondition = {};
    if (keyword && searchBy) {
      if (['name', 'address', 'phone'].includes(searchBy)) {
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
    const [res, total] = await this.supplierRepository.findAndCount({
      where: whereCondition,
      order: { created_at: 'DESC' },
      take: items_per_page,
      skip: skip,
      select: [
        'id',
        'name',
        'description',
        'status',
        'address',
        'phone',
        'created_at',
        'created_update',
      ],
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
}
