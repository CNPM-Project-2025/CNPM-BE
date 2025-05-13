import {
  HttpStatus,
  Injectable,
  NotFoundException,
  HttpException,
  Query,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Like, Repository, UpdateResult } from 'typeorm';
import { FoodItem } from 'src/entities/fooditem.entity';
import { Category } from 'src/entities/category.entity';
import { CreateFoodDto } from 'src/dto/food/create_food_dto';
import { FilterFoodDto } from 'src/dto/food/filter_food_dto';
import { deleteOldImage } from 'helpers/deleteOldImage';

@Injectable()
export class FoodService {
  constructor(
    @InjectRepository(FoodItem)
    private foodItemRepository: Repository<FoodItem>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createFoodDto: CreateFoodDto): Promise<FoodItem> {
    console.log(createFoodDto);

    const category = await this.categoryRepository.findOneBy({
      id: createFoodDto.categoryId,
    });
    if (!category) {
      throw new NotFoundException(
        `Category with ID ${createFoodDto.categoryId} not found`,
      );
    }

    try {
      const foodItem = this.foodItemRepository.create({
        ...createFoodDto,
        category, // Gán mối quan hệ
      });
      return await this.foodItemRepository.save(foodItem);
    } catch (error) {
      throw new HttpException(
        `Cannot create food: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll(query: FilterFoodDto): Promise<any> {
    const items_per_page = Number(query.item_per_page) || 10;
    const page = Number(query.page) || 1;
    const skip = (page - 1) * items_per_page;
    const keyword = query.search || '';
    const searchBy = query.search_by || '';
    const categoryId = Number(query.category) || '';

    // Khởi tạo query builder
    const queryBuilder = this.foodItemRepository
      .createQueryBuilder('foodItem')
      .leftJoinAndSelect('foodItem.category', 'category');

    // Lọc theo từ khóa tìm kiếm
    if (keyword && searchBy) {
      if (['name', 'description'].includes(searchBy)) {
        queryBuilder.andWhere(`foodItem.${searchBy} LIKE :keyword`, {
          keyword: `%${keyword}%`,
        });
      } else {
        throw new HttpException(
          'Invalid search_by field. Use name',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    // Lọc theo danh mục
    if (categoryId) {
      queryBuilder.andWhere('category.id = :categoryId', { categoryId });
    }

    // Lọc theo khoảng giá
    if (query.min_price !== undefined && query.max_price !== undefined) {
      if (Number(query.min_price) > Number(query.max_price)) {
        console.log('huy');
        throw new HttpException(
          'min_price must be less than or equal to max_price',
          HttpStatus.BAD_REQUEST,
        );
      }
      queryBuilder.andWhere(
        'foodItem.sell_price BETWEEN :min_price AND :max_price',
        {
          min_price: query.min_price,
          max_price: query.max_price,
        },
      );
    } else if (query.min_price !== undefined) {
      queryBuilder.andWhere('foodItem.sell_price >= :min_price', {
        min_price: query.min_price,
      });
    } else if (query.max_price !== undefined) {
      queryBuilder.andWhere('foodItem.sell_price <= :max_price', {
        max_price: query.max_price,
      });
    }

    console.log(queryBuilder);
    // Phân trang
    queryBuilder.skip(skip).take(items_per_page);

    // Lấy dữ liệu và tổng số
    const [res, total] = await queryBuilder.getManyAndCount();

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

  async getbycategoryId(categoryId: number): Promise<any> {
    const res: FoodItem[] = await this.foodItemRepository.find({
      where: { category: { id: categoryId } },
    });
    return {
      data: res
    };
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.foodItemRepository.delete(id);
  }

  async findById(id: number): Promise<any> {
    return await this.foodItemRepository.findOneBy({ id });
  }

  async updateImage(id: number, image: string): Promise<UpdateResult> {
    const foodItem = await this.foodItemRepository.findOneBy({ id });
    if (!foodItem) {
      throw new NotFoundException(`foodItem with ID ${id} not found`);
    }
    if (image && foodItem.image) {
      await deleteOldImage(foodItem.image);
    }
    return await this.foodItemRepository.update(id, { image });
  }
}
