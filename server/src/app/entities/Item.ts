import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { ItemToIngredient } from './ItemToIngredient';
import { ItemType } from './ItemType';
import { OrderToItem } from './OrderToItem';

@Entity('ITEMS')
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('text')
  name!: string;

  @Column('numeric')
  price!: number;

  @OneToOne(() => ItemType)
  @JoinColumn()
  itemType!: ItemType;

  @OneToMany(() => ItemToIngredient, (itemToIngredient) => itemToIngredient.item)
  itemToIngredients!: ItemToIngredient[];

  @OneToMany(() => OrderToItem, (orderItems) => orderItems.item)
  @JoinColumn()
  orderToItems: OrderToItem[];
}
