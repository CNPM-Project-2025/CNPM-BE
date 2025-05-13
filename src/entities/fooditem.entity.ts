import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Category } from './category.entity';

@Entity('food_items')
export class FoodItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  sell_price: number;

  @Column()
  import_price: number;

  @Column()
  description: string;

  @Column({ nullable: true, default: null })
  image: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  created_update: Date;

  @Column({ default: 1 })
  status: number;

  @Column()
  stock: number;

  @ManyToOne(() => Category, (category) => category.foodItems)
  @JoinColumn({ name: 'category_id' })
  category: Category;
}
