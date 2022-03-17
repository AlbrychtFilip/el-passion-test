import { IsString } from 'class-validator';

export class GetStatsWeekly200Dto {
  @IsString()
  total_distance: string;

  @IsString()
  total_price: string;
}

export class GetStatsMonthly200Dto {
  @IsString()
  day: string;

  @IsString()
  total_distance: string;

  @IsString()
  avg_ride: string;

  @IsString()
  avg_price: string;
}