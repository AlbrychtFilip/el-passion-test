import { Injectable } from '@nestjs/common';
import { Trip } from './trip.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { WeeklyStatsInterface } from './interfaces/weekly.stats.interface';
import * as moment from 'moment';
import { MonthlyStatsInterface } from './interfaces/monthly.stats.interface';

@Injectable()
export class TripService {
  constructor(
    @InjectRepository(Trip)
    private readonly tripRepository: Repository<Trip>
  ) {}

  addTrip(trip: Trip): Promise<Trip> {
    return this.tripRepository.save<Trip>(trip);
  }

  async getTransactionsFrom(from): Promise<Trip[]> {
    return this.tripRepository.find({
      where: {
        deliveryDate: from
      },
      order: {
        deliveryDate: 'DESC'
      }
    });
  }

  async getWeeklyStats(): Promise<WeeklyStatsInterface> {
    const trips: Trip[] = await this.getTransactionsFrom(
      MoreThanOrEqual(moment().subtract('7', 'days'))
    );

    return {
      "total_distance": `${trips.reduce((a, b) => a + b.distance, 0)}km`,
      "total_price": `${trips.reduce((a, b) => a + b.price, 0)}PLN`
    }
  }

  async getMonthlyStats(): Promise<MonthlyStatsInterface[]> {
    const trips: Trip[] = await this.getTransactionsFrom(
      MoreThanOrEqual(moment().subtract('1', 'month'))
    );

    const mappedByDay: {[k: string]: any} = {};

    trips.forEach(trip => {
      const formatedDate = moment(trip.deliveryDate).format('YYYY-MM-DD');

      if (mappedByDay[formatedDate]) {
        mappedByDay[formatedDate].amount++;
        mappedByDay[formatedDate].total_distance += trip.distance;
        mappedByDay[formatedDate].total_price += trip.price;
        mappedByDay[formatedDate].avg_price = mappedByDay[formatedDate].total_price / mappedByDay[formatedDate].amount;
        mappedByDay[formatedDate].avg_ride += mappedByDay[formatedDate].total_distance / mappedByDay[formatedDate].amount;
      } else {
        mappedByDay[formatedDate] = {
          day: moment(trip.deliveryDate).format('MMMM, Do'),
          total_distance: trip.distance,
          avg_ride: trip.distance,
          total_price: trip.price,
          avg_price: trip.price,
          amount: 1
        }
      }
    });

    return Object.values(mappedByDay).map(v => {
      return {
        day: v.day,
        total_distance: v.total_distance.toFixed(2) + 'km',
        avg_ride: v.avg_ride.toFixed(2) + 'km',
        avg_price: v.avg_price.toFixed(2) + 'PLN',
      }
    });
  }
}
