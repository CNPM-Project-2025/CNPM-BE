import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { DeleteResult, Like, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { deleteOldImage } from 'helpers/deleteOldImage';
import { CreateCategoryDto } from './dto/create_category_dto';
import { FilterCategoryDto } from './dto/filter_category_dto';
import { UpdateCategoryDto } from './dto/update_category_dto';
import { Category } from './entities/category.entity';


@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDTO: CreateCategoryDto): Promise<Category> {
    try {
      const foodItem = this.categoryRepository.create({
        ...createCategoryDTO,
      });
      return await this.categoryRepository.save(foodItem);
    } catch (error) {
      throw new HttpException(
        `Cannot create food: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findById(id: number): Promise<any> {
    return await this.categoryRepository.findOneBy({ id });
  }

  async findAll(@Query() query: FilterCategoryDto): Promise<any> {
    const items_per_page = Number(query.item_per_page) || 10;
    const page = Number(query.page) || 1;
    const skip = (page - 1) * items_per_page;
    const keyword = query.search || '';
    const [res, total] = await this.categoryRepository.findAndCount({
      where: [{ name: Like('%' + keyword + '%') }],
      order: { created_at: 'DESC' },
      take: items_per_page,
      skip: skip,
      select: [
        'id',
        'name',
        'description',
        'status',
        'created_at',
        'created_update',
        'image',
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

  async delete(id: number): Promise<DeleteResult> {
    return await this.categoryRepository.delete(id);
  }

  async update(
    id: number,
    updateCategoryDTO: UpdateCategoryDto,
  ): Promise<UpdateResult> {
    return await this.categoryRepository.update(id, updateCategoryDTO);
  }

  async updateImage(id: number, image: string): Promise<UpdateResult> {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    if (image && category.image) {
      await deleteOldImage(category.image);
    }
    return await this.categoryRepository.update(id, { image });
  }
}
