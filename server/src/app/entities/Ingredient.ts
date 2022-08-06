import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { Item } from './Item';
import { ItemToIngredient } from './ItemToIngredient';

@Entity('INGREDIENTS')
export class Ingredient {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('text')
  name!: string;

  @Column('numeric')
  price!: number;

  @OneToMany(
    () => ItemToIngredient,
    (itemToIngredient) => itemToIngredient.ingredient
  )
  public itemToIngredients!: ItemToIngredient[];
}
