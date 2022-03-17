import { Module } from '@nestjs/common';
import { TripController } from './trip.controller';
import { TripService } from './trip.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trip } from './trip.entity';
import { MapsModule } from '../maps/maps.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Trip]),
    AuthModule,
    MapsModule
  ],
  controllers: [TripController],
  providers: [
    TripService
  ],
})
export class TripModule {}
