import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';
import { PurchaseOrder } from './purchase.entity';

@Entity('suppliers') // Sửa tên bảng thành 'suppliers'
export class Supplier {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true }) // Cho phép null
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: 1 })
  status: number;

  @Column()
  address: string;

  @Column()
  phone: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  created_update: Date;

//   @OneToMany(() => PurchaseOrder, (purchaseOrder) => purchaseOrder.supplier)
//   purchaseOrders: PurchaseOrder[]; // Thêm quan hệ OneToMany
// }
}
