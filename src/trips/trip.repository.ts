import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TripEntity } from './trip.entity';

@Injectable()
export class TripRepository {
  constructor(
    @InjectRepository(TripEntity)
    private tripsRepository: Repository<TripEntity>,
  ) {}

  create(data: TripEntity): Promise<TripEntity> {
    return this.tripsRepository.save(data);
  }

  findAll(): Promise<TripEntity[]> {
    return this.tripsRepository.find();
  }

  findOne(id: string): Promise<TripEntity> {
    return this.tripsRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.tripsRepository.delete(id);
  }
}