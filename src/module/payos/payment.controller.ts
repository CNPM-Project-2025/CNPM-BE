import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Headers,
    Req,
    Res,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { Request, Response } from 'express';
import { Public } from '../auth/decorator/public.decorator';
import { BillService } from '../bill/bill.service';
import { BillStatus } from 'src/constants/bill_status';

@Controller('payment')
export class PaymentController {
    constructor(
        private readonly paymentService: PaymentService,
        private readonly billService: BillService,
    ) { }

    // API tạo thanh toán (Frontend gọi)
    @Post('create')
    @Public()
    async createPayment(@Body() body: { amount: number; orderCode: number }) {
        const { amount, orderCode } = body;
        const paymentLink = await this.paymentService.createPaymentLink(
            amount,
            orderCode
        );
        return paymentLink;
    }


    // API kiểm tra trạng thái
    @Get('status/:orderCode')
    @Public()
    async checkStatus(@Param('orderCode') orderCode: number) {
        return this.paymentService.getPaymentStatus(orderCode);
    }

    // Xử lý webhook PayOS
    @Post('webhook')
    @Public()
    async handleWebhook(
        @Req() req: Request,
        @Res() res: Response,
        @Headers() headers: Record<string, any>
    ) {
        const rawBodyString = (req as any).rawBody?.toString('utf8');
        console.log('Raw body:', rawBodyString);
        console.log('Headers:', headers);

        let data;
        try {
            data = JSON.parse(rawBodyString);
        } catch (e) {
            return res.status(400).send('Invalid JSON');
        }

        const signature = data?.signature;
        if (!signature) {
            return res.status(400).send('Missing signature');
        }

        // Tạo một bản sao object, xóa trường signature để tính chữ ký đúng
        const dataToCheck = { ...data };
        delete dataToCheck.signature;

        // Chuyển lại sang JSON string để tính checksum
        // const bodyStringForCheck = JSON.stringify(dataToCheck);

        // const isValid = this.paymentService.verifyWebhookSignature(rawBodyString, signature);
        // console.log('Signature:', signature);
        // console.log('Is valid:', isValid);

        // if (!isValid) {
        //     return res.status(400).send('Invalid signature');
        // }

        if (data.code === "00") {
            const UpdateBillDto = {
                status: BillStatus.PAID,
            };
            await this.billService.updateBill(data.data.orderCode, UpdateBillDto);
        }

        res.status(200).send('OK');
    }

}
