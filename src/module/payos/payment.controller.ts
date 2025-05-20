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
        @Headers('x-payos-signature') signature: string
    ) {
        const rawBody = (req as any).rawBody?.toString('utf8');
        console.log('Raw body:', rawBody);

        const isValid = this.paymentService.verifyWebhookSignature(rawBody, signature);
        console.log('Signature:', signature);
        console.log('Is valid:', isValid);
        if (!isValid) {
            return res.status(400).send('Invalid signature');
        }

        const body = req.body;
        console.log('Webhook data: ------------------------------------------------------------------------------------------------------------------------', body);


        // TODO: Cập nhật trạng thái đơn hàng ở DB nếu muốn

        res.status(200).send('OK');
    }
}
