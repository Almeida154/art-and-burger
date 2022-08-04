import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { ItemIngredients } from './ItemIngredients';
import { ItemType } from './ItemType';
import { OrderItems } from './OrderItems';

@Entity('ITEMS')
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('numeric')
  price: number;

  @OneToOne(() => ItemType)
  @JoinColumn()
  itemType: ItemType;

  @OneToMany(() => OrderItems, (orderItems) => orderItems.order)
  @JoinColumn({ name: 'order_id' })
  orders: OrderItems[];

  @OneToMany(() => ItemIngredients, (itemIngredients) => itemIngredients.ingredients)
  @JoinColumn({ name: 'ingredient_id' })
  ingredients: ItemIngredients[];
}
