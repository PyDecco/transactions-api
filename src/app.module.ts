import { Module } from '@nestjs/common';
import { InMemoryTransactionRepository } from './infra/memory/transaction-memory.repository';
import { INJECTION_TOKENS } from './domain/constants/injection-tokens';
import { TransactionsController } from './infra/http/controllers/transaction.controller';
import { PinoLogger } from './infra/logger/logger.service';
import { CreateTransactionUseCase } from './application/use-cases/create-transaction.use-case'; // ✅ adicione isso

@Module({
  controllers: [TransactionsController],
  providers: [
    CreateTransactionUseCase, 
    {
      provide: INJECTION_TOKENS.TRANSACTION_REPOSITORY,
      useClass: InMemoryTransactionRepository,
    },
    {
      provide: INJECTION_TOKENS.LOGGER,
      useClass: PinoLogger,
    },
  ],
  exports: [INJECTION_TOKENS.TRANSACTION_REPOSITORY, INJECTION_TOKENS.LOGGER],
})

export class AppModule {}
