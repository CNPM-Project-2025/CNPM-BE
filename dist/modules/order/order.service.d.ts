import { MenuItem } from 'src/entity/menu-item.entity';
import { Repository } from 'typeorm';
import { Order } from '../../entity/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
export declare class OrderService {
    private orderRepository;
    private menuItemRepository;
    constructor(orderRepository: Repository<Order>, menuItemRepository: Repository<MenuItem>);
    createOrder(createOrderDto: CreateOrderDto): Promise<Order>;
}
