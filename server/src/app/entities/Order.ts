import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { OrderItems } from './OrderItems';
import { Status } from './Status';

@Entity('ORDER')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('numeric')
  total_price: number;

  @Column('timestamp')
  ordered_at: Date;

  @OneToOne(() => Status)
  @JoinColumn({ name: 'status_id' })
  status: Status;

  @OneToMany(() => OrderItems, (orderItems) => orderItems.item)
  @JoinColumn({ name: 'item_id' })
  items: OrderItems[];
}
