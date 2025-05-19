import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { OrderService } from '../order/order.service';
import { TableService } from '../table/table.service';
import { BillService } from '../bill/bill.service';
import { CreateBillDto, UpdateBillDto } from '../bill/dto/create_bill_dto';
import { Public } from '../auth/decorator/public.decorator';
import { Roles } from '../auth/decorator/roles.decorator';

@Controller('bill')
export class BillController {
    constructor(
        private readonly billService: BillService,
    ) { }

    @Get()
    @Public()
    async getAllBills(
        @Query('page') page: number = 1,       // Trang hiện tại, mặc định là 1
        @Query('limit') limit: number = 10,     // Số lượng mỗi trang, mặc định là 10
        @Query('search') search: string = '',
        @Query('search_by') searchBy: string = '',
        @Query('min_price') minPrice: number = 0, // Giá tối thiểu
        @Query('max_price') maxPrice: number = 0// Giá tối đa
        // Từ khóa tìm kiếm
    ) {
        // Gọi service để lấy kết quả với phân trang và tìm kiếm
        const result = await this.billService.getBillsWithPagination(page, limit, search, searchBy, minPrice, maxPrice);
        return {
            data: result.data,
            total: result.total,
            page,
            limit,
            lastpage: result.lastpage,
        };
    }

    @Get(':id')
    @Public()
    async getBillById(@Param('id') id: number) {
        return {
            data: await this.billService.getBillById(id),
        };
    }

    @Post()
    @Public()
    async createBill(@Body() createBillDto: CreateBillDto) {
        return {
            data: await this.billService.createBill(createBillDto),
        };
    }

    @Put(':id')
    @Public()
    async updateBill(
      @Param('id') id: number,
      @Body() updateBillDto: UpdateBillDto,
    ) {
      return await this.billService.updateBill(id, updateBillDto);
    }

    // @Delete(':id')
    // async deleteBill(@Param('id') id: number) {
    //   return await this.billService.deleteBill(id);
    // }

}
