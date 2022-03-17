import { IsNumber, IsString } from 'class-validator';

export class ErrorDto {
  @IsNumber()
  status: number;

  @IsString()
  message: string;

  [k: string]: any;
}