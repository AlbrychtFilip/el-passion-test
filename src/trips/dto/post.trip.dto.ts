import { IsDate, IsNumber, IsString } from 'class-validator';

export class PostTrip {
  @IsString()
  public start_address: string;

  @IsString()
  public destination_address: string;

  @IsNumber()
  public price: number;

  @IsDate()
  public date: Date;
}