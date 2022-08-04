import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ItemType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  desc: string;
}
