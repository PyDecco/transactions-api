import { ApiProperty } from '@nestjs/swagger';

export class StatisticsResponseDto {
  @ApiProperty({ example: 10 })
  count: number;

  @ApiProperty({ example: 1234.56 })
  sum: number;

  @ApiProperty({ example: 123.45 })
  avg: number;

  @ApiProperty({ example: 12.34 })
  min: number;

  @ApiProperty({ example: 456.78 })
  max: number;
}