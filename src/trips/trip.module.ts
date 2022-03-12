import { Module } from '@nestjs/common';
import { TripController } from './trip.controller';
import { TripService } from './trip.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TripEntity } from './trip.entity';
import { TripRepository } from './trip.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([TripEntity])
  ],
  controllers: [TripController],
  providers: [
    TripRepository,
    TripService
  ],
})
export class TripModule {}
