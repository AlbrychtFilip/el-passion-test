import { Body, Controller, Get, Post } from '@nestjs/common';
import { TripService } from './trip.service';
import { TripEntity } from './trip.entity';
import { RequestDto } from './dto/request.dto';

@Controller()
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Post('/api/stats/weekly')
  getHello(@Body() body: RequestDto): Promise<TripEntity[]> {
    return this.tripService.getWeekly();
  }
}
