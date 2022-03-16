import { Injectable } from '@nestjs/common';
import { Trip } from './trip.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TripService {
  constructor(
    @InjectRepository(Trip)
    private readonly tripRepository: Repository<Trip>
  ) {}

  getWeekly() {
    return;
  }
}
