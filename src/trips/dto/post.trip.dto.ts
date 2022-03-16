import { IsISO8601, IsNumber, IsString } from 'class-validator';

export class PostTrip {
  @IsString()
  public start_address: string;

  @IsString()
  public destination_address: string;

  @IsNumber()
  public price: number;

  @IsISO8601()
  public date: Date;
}