import { Bill } from 'src/module/bill/entities/bill.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tables')
export class Table {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  qr_code: string;
  
  @Column({ nullable: true })
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Bill, (bill) => bill.table, { nullable: true })
  bills: Bill[];
}
