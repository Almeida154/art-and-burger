import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ItemIngredients {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  item_id: number;

  @Column()
  ingredient_id: number;
}
