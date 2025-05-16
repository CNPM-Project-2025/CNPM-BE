import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
  SetMetadata,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiResponse, ApiQuery } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { storageConfig } from 'helpers/config';
import { extname } from 'path';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Public } from '../auth/decorator/public.decorator';
import { Roles } from '../auth/decorator/roles.decorator';
import { CreateFoodDto } from './dto/create_food_dto';
import { FilterFoodDto } from './dto/filter_food_dto';
import { FoodItem } from './entities/fooditem.entity';
import { FoodService } from './food.service';


@Controller('food')
export class FoodController {

  constructor(private foodService: FoodService) { }

  @Post()
  @Roles('Admin')
  @ApiResponse({ status: 201, description: 'Food item created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  create(@Body() createFoodDto: CreateFoodDto): Promise<FoodItem> {
    return this.foodService.create(createFoodDto);
  }

  @Get()
  @Public()
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'items_per_page', required: false })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({
    name: 'search_by',
    required: false,
    enum: ['name'],
  }) // Chỉ định các trường hợp lệ
  @ApiQuery({ name: 'category', required: false })
  @ApiQuery({
    name: 'min_price',
    required: false,
  })
  @ApiQuery({ name: 'max_price', required: false })
  findAll(@Query() query: FilterFoodDto): Promise<any> {
    console.log(query);
    return this.foodService.findAll(query);
  }

  @Get('category/:categoryId')
  @Public()
  getbycategoryId(
    @Param('categoryId') categoryId: string): Promise<any> {
    return this.foodService.getbycategoryId(Number(categoryId));
  }


  @Delete(':id')
  @Roles('Admin')
  delete(@Param('id') id: string): Promise<DeleteResult> {
    return this.foodService.delete(Number(id));
  }

  @Get(':id')
  @Public()
  getFoodByID(@Param('id') id: string): Promise<any> {
    return this.foodService.findById(Number(id));
  }

  @Put(':id')
  @Roles('Admin')
  update(
    @Param('id') id: string,
    @Body() createFoodDto: CreateFoodDto,
  ): Promise<UpdateResult> {
    return this.foodService.update(Number(id), createFoodDto);
  }

  @Post(':foodID/upload-image-food')
  @UseInterceptors(
    FileInterceptor('imageFood', {
      storage: storageConfig('FoodImage'),
      fileFilter: (req, file, cb) => {
        const ext = extname(file.originalname);
        const allowedExtArr = ['.jpg', '.png', '.jpeg'];
        if (!allowedExtArr.includes(ext)) {
          req.fileValidationError = `Wrong extension type. Accepted file ext are: ${allowedExtArr.toString()}`;
          cb(null, false);
        } else {
          const fileSize = parseInt(req.headers['content-length']);
          if (fileSize > 1024 * 1024 * 5) {
            req.fileValidationError = `File size is too large. Accepted file size is less than 5MB `;
          } else {
            cb(null, true);
          }
        }
      },
    }),
  ) // trung voi field name khi fontend truyen len
  uploadAvatar(
    @Param('foodID') foodID: string,
    @Req()
    req: any,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<UpdateResult> {
    console.log('upload image category');
    console.log('user data ', req.user_data);
    console.log(file);
    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError);
    }
    if (!file) {
      throw new BadRequestException('File is required');
    }
    return this.foodService.updateImage(
      Number(foodID),
      file.destination + '/' + file.filename,
    );
  }
}
