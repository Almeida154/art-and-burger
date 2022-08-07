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

  @Column({
    type: 'timestamp with time zone',
    default: () => 'now()',
  })
  orderedAt: Date;

  @OneToOne(() => Status)
  @JoinColumn()
  status: Status;

  @OneToMany(() => OrderToItem, (orderItems) => orderItems.order)
  @JoinColumn()
  orderToItems: OrderToItem[];
}
