import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { FoodItem } from './fooditem.entity';
import { OrderStatus } from 'src/constants/order_status';
import { Bill } from './bill.entity';

@Entity('order_details')
export class OrderDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Bill, (bill) => bill.orderDetails)
  bill: Bill;

  @ManyToOne(() => FoodItem)
  foodItem: FoodItem;

  @Column()
  quantity: number;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PLACED,
  })
  status: OrderStatus;
}
