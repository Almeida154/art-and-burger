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
  public itemToIngredients!: ItemToIngredient[];
}
