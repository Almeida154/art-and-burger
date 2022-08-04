import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('numeric')
  total_price: number;

  @Column('text')
  status: string;

  @Column('timestamp')
  ordered_at: Date;
}
