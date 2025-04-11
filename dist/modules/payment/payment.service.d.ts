import { Order } from 'src/entity/order.entity';
import { Repository } from 'typeorm';
import { ProcessPaymentDto } from './dto/process-payment.dto';
export declare class PaymentService {
    private orderRepository;
    constructor(orderRepository: Repository<Order>);
    processPayment(processPaymentDto: ProcessPaymentDto): Promise<{
        message: string;
        order: Order;
    }>;
}
