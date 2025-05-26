import { Logger, Module } from '@nestjs/common';
import { INJECTION_TOKENS } from './interfaces/constants/injection-tokens';
import { TransactionsController } from './controllers/transaction.controller';
import { InMemoryTransactionRepository } from './repositories/transaction-memory.repository';
import { PinoLogger } from './infra/logger/logger.service';

import { CreateTransactionUseCase } from './use-cases/create-transaction.use-case';
import { DeleteAllTransactionsUseCase } from './use-cases/delete-all-transactions.use-case';
import { GetStatisticsUseCase } from './use-cases/get-statistics.use-case';
import { TransactionRepository } from './interfaces/transaction-repository.interface';
import { HealthController } from './controllers/health.controller';

@Module({
  controllers: [TransactionsController, HealthController],
  providers: [
    CreateTransactionUseCase,
    DeleteAllTransactionsUseCase,
    {
      provide: GetStatisticsUseCase,
      useFactory: (
        repository: TransactionRepository,
        logger: Logger,
      ) => new GetStatisticsUseCase(repository, logger, 60),
      inject: [INJECTION_TOKENS.TRANSACTION_REPOSITORY, INJECTION_TOKENS.LOGGER],
    },
    {
      provide: INJECTION_TOKENS.TRANSACTION_REPOSITORY,
      useClass: InMemoryTransactionRepository,
    },
    {
      provide: INJECTION_TOKENS.LOGGER,
      useClass: PinoLogger,
    },
  ],
  exports: [
    INJECTION_TOKENS.TRANSACTION_REPOSITORY,
    INJECTION_TOKENS.LOGGER,
  ],
})
export class AppModule {}

