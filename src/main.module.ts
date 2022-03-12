import { Module } from '@nestjs/common';
import { TripModule } from './trips/trip.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TripEntity } from './trips/trip.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [TripEntity],
      synchronize: true,
      autoLoadEntities: true,
    }),
    TripModule
  ],
})
export class MainModule {}