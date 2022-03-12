import { Inject, Injectable } from '@nestjs/common';
import { TripRepository } from './trip.repository';
import { TripEntity } from './trip.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TripService {
  constructor(
    @Inject(TripRepository)
    private readonly tripRepository: TripRepository
  ) {}

  getWeekly(): Promise<TripEntity[]> {
    return this.tripRepository.findAll();
  }
}
