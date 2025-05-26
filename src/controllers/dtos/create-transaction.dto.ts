import { IsNumber, IsISO8601, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionDto {
  @ApiProperty({
    example: 123.45,
    description: 'Valor da transação. Deve ser um número positivo ou zero.',
  })
  @IsNumber()
  @Min(0, { message: 'O amount não pode ser negativo.' })
  @Type(() => Number)
  amount: number;

  @ApiProperty({
    example: '2024-02-20T12:34:56.789Z',
    description: 'Data e hora da transação no formato ISO 8601 (UTC).',
  })
  @IsISO8601({}, { message: 'O timestamp deve estar em formato ISO 8601.' })
  timestamp: string;
}
