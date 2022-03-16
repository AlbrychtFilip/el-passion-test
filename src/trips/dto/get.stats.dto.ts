import { IsEnum } from 'class-validator';

export enum Stats {
  MONTHLY = 'monthly',
  WEEKLY = 'weekly'
}

export class GetStats {
  @IsEnum(Stats)
  public type: Stats;
}