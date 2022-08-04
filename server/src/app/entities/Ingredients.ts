import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm';
import { ItemIngredients } from './ItemIngredients';

@Entity('INGREDIENTS')
export class Ingredients {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('numeric')
  price: number;

  @OneToMany(() => ItemIngredients, (itemIngredients) => itemIngredients.items)
  @JoinColumn({ name: 'item_id' })
  items: ItemIngredients[];
}
