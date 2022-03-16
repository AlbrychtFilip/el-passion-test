import {
  Column,
  CreateDateColumn,
  Entity, Generated,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'trips'
})
export class Trip {
  @PrimaryColumn({type: 'uuid'})
  @Generated('uuid')
  id: string;

  @Column('text')
  startAddress: string;

  @Column('text')
  destinationAddress: string;

  @Column('float')
  price: number;

  @Column('date')
  deliveryDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}