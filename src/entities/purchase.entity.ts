import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Supplier } from './supplier.entity';
import { PurchaseOrderDetail } from './purchase_order_detail.entity';
import { User } from './user.entity';
import { PurchaseOrderStatus } from 'src/constants/purchase_order_status';

@Entity('purchase_orders')
export class PurchaseOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: PurchaseOrderStatus,
    default: PurchaseOrderStatus.PENDING,
  })
  status: PurchaseOrderStatus;

  // @ManyToOne(() => Supplier, (supplier) => supplier.purchaseOrders)
  // @JoinColumn({ name: 'supplier_id' })
  // supplier: Supplier;

  @OneToMany(
    () => PurchaseOrderDetail,
    (detailPurchase) => detailPurchase.purchaseOrder,
  )
  purchaseOrderDetails: PurchaseOrderDetail[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.purchases)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
