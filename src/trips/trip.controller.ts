import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { TripService } from './trip.service';
import { PostTrip } from './dto/post.trip.dto';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { GetStats, Stats } from './dto/get.stats.dto';
import { MapsService } from '../maps/maps.service';
import {
  ApiCreatedResponse,
  ApiInternalServerErrorResponse, ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { GetStatsMonthly200Dto, GetStatsWeekly200Dto } from './dto/get.stats.200.dto';
import { ErrorDto } from '../dto/error.dto';

@ApiTags('Trips')
@Controller('/api')
export class TripController {
  constructor(
    private readonly tripService: TripService,
    private readonly mapsService: MapsService,
  ) {}

  @Post('/trips')
  @ApiInternalServerErrorResponse({
    type: ErrorDto,
    description: 'Internal server error.'
  })
  @ApiNotFoundResponse({
    type: ErrorDto,
    description: 'Address not found.'
  })
  @ApiCreatedResponse({
    description: 'Trip has been successfully added.'
  })
  async postTrip(
    @Body() body: PostTrip,
    @Res() res: Response
  ) {
    try {
      const distanceInKm = await this.mapsService.calculateDistance(body.start_address, body.destination_address);

      if (!distanceInKm) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({
            status: StatusCodes.NOT_FOUND,
            message: 'Address not found.'
          })
      }

      await this.tripService.addTrip({
        deliveryDate: body.date,
        distance: distanceInKm,
        destinationAddress: body.destination_address,
        price: body.price,
        startAddress: body.start_address
      })

      return res.status(StatusCodes.CREATED).end();
    } catch (e) {
      console.error('postTrip error: ', e)
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
          status: StatusCodes.INTERNAL_SERVER_ERROR,
          message: 'Internal Server Error.'
        });
    }
  }

  @Get('/stats/:type')
  @ApiInternalServerErrorResponse({
    type: ErrorDto,
    description: 'Internal server error.'
  })
  @ApiOkResponse({
    schema: {
      oneOf: [
        {
          type: 'array',
          items: {
            $ref: getSchemaPath(GetStatsMonthly200Dto)
          }
        },
        { $ref: getSchemaPath(GetStatsWeekly200Dto) }
      ]
    }
  })
  async getStats(@Param() params: GetStats, @Res() res: Response) {
    try {
      if (params.type === Stats.WEEKLY) {
        const weeklyStats = await this.tripService.getWeeklyStats()

        return res.json(weeklyStats)
      } else if (params.type === Stats.MONTHLY) {
        const monthlyStats = await this.tripService.getMonthlyStats()

        return res.json(monthlyStats)
      } else {
        return res.json({})
      }
    } catch (e) {
      console.error('getStats error: ', e)
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
          status: StatusCodes.INTERNAL_SERVER_ERROR,
          message: 'Internal Server Error.'
        });
    }
  }
}
