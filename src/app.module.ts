import { Module } from '@nestjs/common';
import { InMemoryTransactionRepository } from './infra/memory/transaction-memory.repository';
import { INJECTION_TOKENS } from './domain/constants/injection-tokens';



@Module({
  providers: [
    {
      provide: INJECTION_TOKENS.TRANSACTION_REPOSITORY,
      useClass: InMemoryTransactionRepository,
    }
  ],
  exports: [INJECTION_TOKENS.TRANSACTION_REPOSITORY],
})
export class AppModule {}
