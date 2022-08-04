import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('ITEM_TYPES')
export class ItemType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  desc: string;
}
