import { Injectable, Inject } from '@nestjs/common';
import { TransactionRepository } from '../../domain/repositories/transaction-repository.interface';
import { INJECTION_TOKENS } from '../../domain/constants/injection-tokens';
import { StatisticsResponseDto } from 'src/application/dtos/response/statistics-response.dto';
import { Logger } from 'src/domain/interfaces/logger.interface';

@Injectable()
export class GetStatisticsUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.TRANSACTION_REPOSITORY)
    private readonly repository: TransactionRepository,

    @Inject(INJECTION_TOKENS.LOGGER)
    private readonly logger: Logger,

    private readonly windowInSeconds = 60,
  ) {}

  async execute(): Promise<StatisticsResponseDto> {
    this.logger.log(`Calculando estatísticas para os últimos ${this.windowInSeconds} segundos`);

    const transactions = await this.repository.findRecent(this.windowInSeconds);
    const values = transactions.map(t => t.amount);

    const stats: StatisticsResponseDto = {
      count: this.count(values),
      sum: this.sum(values),
      avg: this.avg(values),
      min: this.min(values),
      max: this.max(values),
    };

    this.logger.log(`Estatísticas calculadas: ${JSON.stringify(stats)}`);
    return stats;
  }

  private count(values: number[]): number {
    return values.length;
  }

  private sum(values: number[]): number {
    return values.reduce((acc, val) => acc + val, 0);
  }

  private avg(values: number[]): number {
    return values.length > 0 ? this.sum(values) / values.length : 0;
  }

  private min(values: number[]): number {
    return values.length > 0 ? Math.min(...values) : 0;
  }

  private max(values: number[]): number {
    return values.length > 0 ? Math.max(...values) : 0;
  }
}

