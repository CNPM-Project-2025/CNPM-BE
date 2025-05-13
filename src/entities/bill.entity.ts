import { BillStatus } from 'src/constants/bill_status';
import { PaymentMethod } from 'src/constants/type_payment';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Table } from './table.entity';
import { OrderType } from 'src/constants/type_order';
import { OrderDetail } from './order_detail.entity';
@Entity('bills')
export class Bill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: PaymentMethod,
    nullable: true,
  })
  paymentMethod: PaymentMethod;

  @Column({
    type: 'enum',
    enum: OrderType,
  })
  type: OrderType;

  @Column({
    type: 'enum',
    enum: BillStatus,
    default: BillStatus.UNPAID,
  })
  status: BillStatus;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => Number(value),
    },
  })
  totalPrice: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Table, (table) => table.bills, { nullable: true })
  @JoinColumn({ name: 'table_id' })
  table: Table;

  @OneToMany(() => OrderDetail, (detail) => detail.bill)
  orderDetails: OrderDetail[];
}
