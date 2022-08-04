import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Ingredients } from './Ingredients';
import { Item } from './Item';

@Entity('ITEM_INGREDIENTS')
export class ItemIngredients {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Item, (item) => item.ingredients)
  items: Item;

  @ManyToOne(() => Ingredients, (ingredient) => ingredient.items)
  ingredients: Ingredients;
}
