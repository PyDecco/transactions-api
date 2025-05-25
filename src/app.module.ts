import { Logger, Module } from '@nestjs/common';
import { INJECTION_TOKENS } from './domain/constants/injection-tokens';
import { TransactionsController } from './infra/http/controllers/transaction.controller';
import { InMemoryTransactionRepository } from './infra/memory/transaction-memory.repository';
import { PinoLogger } from './infra/logger/logger.service';

// Use Cases
import { CreateTransactionUseCase } from './application/use-cases/create-transaction.use-case';
import { DeleteAllTransactionsUseCase } from './application/use-cases/delete-all-transactions.use-case';
import { GetStatisticsUseCase } from './application/use-cases/get-statistics.use-case';
import { TransactionRepository } from './domain/repositories/transaction-repository.interface';

@Module({
  controllers: [TransactionsController],
  providers: [
    // Use Cases
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

    // Repository & Logger
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

