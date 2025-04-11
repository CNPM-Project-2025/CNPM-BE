export declare class CreateOrderDto {
    customerId?: number;
    items: {
        itemId: number;
        quantity: number;
    }[];
    isTakeAway: boolean;
    tableId: number;
}
