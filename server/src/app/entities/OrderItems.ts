import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class OrderItems {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  item_id: number;

  @Column()
  order_id: number;
}
