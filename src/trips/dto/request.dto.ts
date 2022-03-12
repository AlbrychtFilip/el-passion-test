import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Max, Min } from 'class-validator';

export class RequestDto {
  @IsString()
  @ApiProperty()
  public firstname: string;

  @ApiProperty()
  @IsString()
  public lastname: string;

  @IsNumber()
  @Min(5)
  @Max(10)
  @ApiProperty({
    maximum: 10,
    minimum: 5
  })
  public age: number;
}