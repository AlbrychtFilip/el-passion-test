import { Test } from '@nestjs/testing';
import { TripService } from '../src/trips/trip.service';
import { MapsService } from '../src/maps/maps.service';
import { Repository } from 'typeorm';
import { Trip } from '../src/trips/trip.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { tripRepositoryMock } from './mocks/trip.repository.mock';

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
        createdAt: new Date('2021-03-10'),
        deliveryDate: new Date('2021-03-10'),
        destinationAddress: 'destination address',
        distance: 10,
        id: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000',
        price: 10,
        startAddress: 'start address',
        updatedAt: new Date('2021-03-10')
      },
      {
        createdAt: new Date('2021-03-10'),
        deliveryDate: new Date('2021-03-10'),
        destinationAddress: 'destination address',
        distance: 12,
        id: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc100',
        price: 33,
        startAddress: 'start address',
        updatedAt: new Date('2021-03-10')
      },
      {
        createdAt: new Date('2021-03-10'),
        deliveryDate: new Date('2021-03-10'),
        destinationAddress: 'destination address',
        distance: 112,
        id: '11bf5b37-e0b8-42e0-1dcf-dc8c4aefc100',
        price: 323,
        startAddress: 'start address',
        updatedAt: new Date('2021-03-10')
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
      trips = trips.concat([
        {
          createdAt: new Date('2021-03-11'),
          deliveryDate: new Date('2021-03-11'),
          destinationAddress: 'destination address',
          distance: 112,
          id: '11bf5b37-e0b8-42e0-1dcf-dc8c4affc100',
          price: 323,
          startAddress: 'start address',
          updatedAt: new Date('2021-03-11')
        },
        {
          createdAt: new Date('2021-03-11'),
          deliveryDate: new Date('2021-03-11'),
          destinationAddress: 'destination address',
          distance: 100,
          id: '11bf5b37-e0b8-42e0-1dcf-dc8c4defc100',
          price: 213,
          startAddress: 'start address',
          updatedAt: new Date('2021-03-11')
        }
      ])
      jest.spyOn(tripRepository, 'find').mockResolvedValue(trips)
      const result = await tripService.getMonthlyStats();

      expect(result.length).toEqual(2);
      expect(result[0]).toEqual({
        day: 'March, 10th',
        total_distance: '134.00km',
        avg_ride: '65.67km',
        avg_price: '122.00PLN'
      });
      expect(result[1]).toEqual({
          day: 'March, 11th',
          total_distance: '212.00km',
          avg_ride: '218.00km',
          avg_price: '268.00PLN'
        }
      );
    });
  });
});