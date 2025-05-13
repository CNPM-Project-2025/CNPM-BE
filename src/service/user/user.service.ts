import { Injectable, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { DeleteResult, Like, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from '../../dto/user/create_user_dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from '../../dto/user/update_user_dto';
import { FilterUserDto } from '../../dto/user/filter_user_dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(@Query() query: FilterUserDto): Promise<any> {
    const items_per_page = Number(query.item_per_page) || 10;
    const page = Number(query.page) || 1;
    const skip = (page - 1) * items_per_page;
    const keyword = query.search || '';
    const searchBy = query.search_by || '';
    let whereCondition = {};
    if (keyword && searchBy) {
      if (['email', 'first_name', 'phone'].includes(searchBy)) {
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
    const [res, total] = await this.userRepository.findAndCount({
      where: whereCondition,
      order: { created_at: 'DESC' },
      take: items_per_page,
      skip: skip,
      select: [
        'id',
        'first_name',
        'last_name',
        'email',
        'phone',
        'status',
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
  async findUserById(id: number): Promise<any> {
    return await this.userRepository.findOneBy({ id });
  }

  async create(creatUserDto: CreateUserDto): Promise<User> {
    const hasPassword = await bcrypt.hash(creatUserDto.password, 10);
    return await this.userRepository.save(creatUserDto);
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    return await this.userRepository.update(id, updateUserDto);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.userRepository.delete(id);
  }

  async updateAvatar(id: number, avatar: string): Promise<UpdateResult> {
    return await this.userRepository.update(id, { avatar });
  }
}
