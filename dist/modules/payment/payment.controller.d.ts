import { ProcessPaymentDto } from './dto/process-payment.dto';
import { PaymentService } from './payment.service';
export declare class PaymentController {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
    processPayment(processPaymentDto: ProcessPaymentDto): Promise<{
        message: string;
        order: import("../../entity").Order;
    }>;
}
