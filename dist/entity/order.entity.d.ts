import { MenuItem } from './menu-item.entity';
import { User } from './user.entity';
export declare class Order {
    id: number;
    customer: User;
    items: MenuItem[];
    quantities: {
        itemId: number;
        quantity: number;
    }[];
    totalPrice: number;
    status: string;
    isTakeaway: boolean;
    tableId: number;
}
