import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Ingredient } from './Ingredient';
import { Item } from './Item';

@Entity('ITEMS_TO_INGREDIENTS')
export class ItemToIngredient {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('uuid')
  itemId!: string;

  @Column('uuid')
  ingredientId!: string;

  @ManyToOne(() => Item, (item) => item.itemToIngredients)
  item!: Item;

  @ManyToOne(() => Ingredient, (ingredient) => ingredient.itemToIngredients)
  ingredient!: Ingredient;
}
