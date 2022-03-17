import { Test } from '@nestjs/testing';
import { TripService } from '../src/trips/trip.service';
import { MapsService } from '../src/maps/maps.service';
import { Repository } from 'typeorm';
import { Trip } from '../src/trips/trip.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { tripRepositoryMock } from './mocks/trip.repository.mock';
import Mock = jest.Mock;

describe('TripService', () => {
  let mapsService: MapsService;
  let tripService: TripService;
  let tripRepository: Repository<Trip>;
  let trips: Trip[];
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TripService,
        {
          provide: getRepositoryToken(Trip),
          useFactory: tripRepositoryMock
        },
        MapsService
      ]
    }).compile()

    mapsService = await module.get(MapsService);
    tripService = await module.get(TripService);
    tripRepository = await module.get(getRepositoryToken(Trip));
    trips = [
      {
        createdAt: new Date(),
        deliveryDate: new Date(),
        destinationAddress: 'destination address',
        distance: 10,
        id: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000',
        price: 10,
        startAddress: 'start address',
        updatedAt: new Date()
      },
      {
        createdAt: new Date(),
        deliveryDate: new Date(),
        destinationAddress: 'destination address',
        distance: 12,
        id: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc100',
        price: 33,
        startAddress: 'start address',
        updatedAt: new Date()
      },
      {
        createdAt: new Date(),
        deliveryDate: new Date(),
        destinationAddress: 'destination address',
        distance: 112,
        id: '11bf5b37-e0b8-42e0-1dcf-dc8c4aefc100',
        price: 323,
        startAddress: 'start address',
        updatedAt: new Date()
      }
    ];
  })

  describe('addTrip', () => {
    it('Should add trip entity ', async () => {
      const result = await tripService.addTrip(trips[0]);

      expect(result).toEqual(trips[0]);
      expect(tripRepository.save).toBeCalledTimes(1)
    });
  });

  describe('getWeeklyStats', () => {
    it('Should calculate weekly distance and price ', async () => {
      jest.spyOn(tripRepository, 'find').mockResolvedValue(trips)
      const result = await tripService.getWeeklyStats();

      expect(result.total_distance).toEqual('134km');
      expect(result.total_price).toEqual('366PLN');
      expect(tripRepository.find).toBeCalledTimes(1);
    });
  });

  describe('getMonthlyStats', () => {
    it('Should return details about last month trips ', async () => {

    });
  });
});