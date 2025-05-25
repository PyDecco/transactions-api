import { IsNumber, IsISO8601, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTransactionDto {
  @IsNumber()
  @Min(0, { message: 'O amount não pode ser negativo.' })
  @Type(() => Number)
  amount: number;

  @IsISO8601({}, { message: 'O timestamp deve estar em formato ISO 8601.' })
  timestamp: string;
}
