import {
  Column,
  CreateDateColumn,
  Entity, Generated,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class TripEntity {
  @PrimaryColumn({type: 'uuid'})
  @Generated('uuid')
  id: string;

  @Column('text')
  start_address: string;

  @Column('text')
  destination_address: string;

  @Column('float')
  price: number;

  @Column('date')
  delivery_date: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}