import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Ingredient } from './Ingredient';
import { Item } from './Item';

@Entity('ITEM_INGREDIENTS')
export class ItemIngredients {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Item, (item) => item.ingredients)
  items: Item;

  @ManyToOne(() => Ingredient, (ingredient) => ingredient.items)
  ingredients: Ingredient;
}
