import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { TripService } from './trip.service';
import { PostTrip } from './dto/post.trip.dto';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { GetStats, Stats } from './dto/get.stats.dto';
import { MapsService } from '../maps/maps.service';

@Controller('/api')
export class TripController {
  constructor(
    private readonly tripService: TripService,
    private readonly mapsService: MapsService,
  ) {}

  @Post('/trips')
  async postTrip(
    @Body() body: PostTrip,
    @Res() res: Response
  ) {
    try {
      await this.mapsService.calculateDistance(body.start_address, body.destination_address)
      await this.tripService.addTrip({
        deliveryDate: body.date,
        destinationAddress: body.destination_address,
        price: body.price,
        startAddress: body.start_address
      })

      return res.status(StatusCodes.CREATED).end();
    } catch (e) {
      console.log(e)
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
          status: StatusCodes.INTERNAL_SERVER_ERROR,
          message: 'Internal Server Error.'
        });
    }
  }

  @Get('/stats/:type')
  getStats(@Param() params: GetStats) {
    if (params.type === Stats.WEEKLY) {
    } else if (params.type === Stats.MONTHLY) {

    } else {

    }
  }
}
