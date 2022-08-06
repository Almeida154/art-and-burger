import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { OrderToItem } from './OrderToItem';
import { Status } from './Status';

@Entity('ORDERS')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('numeric')
  totalPrice: number;

  @Column('timestamp')
  orderedAt: Date;

  @OneToOne(() => Status)
  @JoinColumn()
  status: Status;

  // @OneToMany(() => OrderItems, (orderItems) => orderItems.item)
  // @JoinColumn({ name: 'item_id' })
  // items: OrderItems[];
}
