import { Body, Controller, Get, Post } from '@nestjs/common';
import { TripService } from './trip.service';
import { Trip } from './trip.entity';
import { PostTrip } from './dto/post.trip.dto';

@Controller('/api')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Post('/trips')
  postTrip(@Body() body: PostTrip): Promise<Trip[]> {
    return this.tripService.getWeekly();
  }

  @Get('/stats/weekly')
  getWeeklyStats() {
    
  }
}
