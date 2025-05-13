import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CategoryService } from 'src/service/category/category.service';
import { Category } from 'src/entities/category.entity';
import { CreateCategoryDto } from '../../dto/category/create_category_dto';
import { UpdateCategoryDto } from '../../dto/category/update_category_dto';
import { AuthGuard } from 'src/auth/auth-guard';
import { FoodItem } from 'src/entities/fooditem.entity';
import { ApiQuery } from '@nestjs/swagger';
import { FilterCategoryDto } from '../../dto/category/filter_category_dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageConfig } from 'helpers/config';
import { extname } from 'path';
import { UpdateResult } from 'typeorm';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { Public } from 'src/auth/decorator/public.decorator';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}
  @Get()
  @Public()
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'items_per_page', required: false })
  @ApiQuery({ name: 'search', required: false })
  findAll(@Query() query: FilterCategoryDto): Promise<any> {
    return this.categoryService.findAll(query);
  }
  @Get(':id')
  @Public()
  getCategoryById(@Param('id') id: string): Promise<any> {
    return this.categoryService.findById(Number(id));
  }

  @Post()
  @Roles('Admin')
  create(
    @Req() req: any,
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.create(createCategoryDto);
  }

  @Put(':id')
  @Roles('Admin')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDTO: UpdateCategoryDto,
  ) {
    return this.categoryService.update(Number(id), updateCategoryDTO);
  }

  @Delete(':id')
  @Roles('Admin')
  delete(@Param('id') id: string) {
    return this.categoryService.delete(Number(id));
  }

  @Post(':categoryId/upload-image-category')
  @Roles('Admin')
  @UseInterceptors(
    FileInterceptor('image-category', {
      storage: storageConfig('category'),
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
    @Param('categoryId') categoryID: string,
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
    return this.categoryService.updateImage(
      Number(categoryID),
      file.destination + '/' + file.filename,
    );
  }
}
