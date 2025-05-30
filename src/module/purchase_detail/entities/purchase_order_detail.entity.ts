import { FoodItem } from 'src/module/food/entities/fooditem.entity';
import { PurchaseOrder } from 'src/module/purchase/entities/purchase.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('purchase_order_details')
export class PurchaseOrderDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => PurchaseOrder,
    (purchaseOrder) => purchaseOrder.purchaseOrderDetails,
  )
  @JoinColumn({ name: 'purchase_order_id' })
  purchaseOrder: PurchaseOrder;

  @ManyToOne(() => FoodItem) // Quan hệ với Product
  @JoinColumn({ name: 'product_id' })
  product: FoodItem; // Object sản phẩm

  @Column()
  quantity: number; // Số lượng sản phẩm trong chi tiết phiếu nhập

  @Column()
  price: number; // Giá tại thời điểm nhập (có thể khác với giá sản phẩm hiện tại)
}
