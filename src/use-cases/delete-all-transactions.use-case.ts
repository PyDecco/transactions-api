import { Inject, Injectable } from '@nestjs/common';

import { TransactionRepository } from '@/interfaces/transaction-repository.interface';
import { Logger } from '@/interfaces/logger.interface';
import { INJECTION_TOKENS } from '@/interfaces/constants/injection-tokens';

@Injectable()
export class DeleteAllTransactionsUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.TRANSACTION_REPOSITORY)
    private readonly repository: TransactionRepository,

    @Inject(INJECTION_TOKENS.LOGGER)
    private readonly logger: Logger,
  ) {}

  async execute(): Promise<void> {
    this.logger.log('Removendo todas as transações da memória...');
    await this.repository.deleteAll();
    this.logger.log('Todas as transações foram removidas.');
  }
}
