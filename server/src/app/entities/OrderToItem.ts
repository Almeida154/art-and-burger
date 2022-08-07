import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Item } from './Item';
import { Order } from './Order';

@Entity('ORDERS_TO_ITEMS')
export class OrderToItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  itemId!: string;

  @Column('uuid')
  orderId!: string;

  @ManyToOne(() => Item, (item) => item.orderToItems)
  item: Item;

  @ManyToOne(() => Order, (order) => order.orderToItems)
  order: Order;
}
