import { BillStatus } from 'src/constants/bill_status';
import { OrderType } from 'src/constants/type_order';
import { PaymentMethod } from 'src/constants/type_payment';
import { OrderDetail } from 'src/module/order/entities/order_detail.entity';
import { Table } from 'src/module/table/entities/table.entity';
import { CardInfoDto } from 'src/module/bill/dto/create_bill_dto';

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

  @Column({ type: 'json', nullable: true })
  cardinfo: CardInfoDto | null;

  @ManyToOne(() => Table, (table) => table.bills, { nullable: true })
  @JoinColumn({ name: 'table_id' })
  table: Table;

  @OneToMany(() => OrderDetail, (detail) => detail.bill)
  orderDetails: OrderDetail[];
}
