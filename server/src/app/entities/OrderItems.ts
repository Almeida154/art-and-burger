import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Item } from './Item';
import { Order } from './Order';

@Entity('ORDERS_TO_ITEMS')
export class OrderItems {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @ManyToOne(() => Item, (item) => item.orders)
  // item: Item;

  // @ManyToOne(() => Order, (order) => order.items)
  // order: Order;
}
