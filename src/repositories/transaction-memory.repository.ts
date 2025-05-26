import { Inject, Injectable } from '@nestjs/common';
import { Transaction } from '@/entities/transaction.entity';
import { TransactionRepository } from '@/interfaces/transaction-repository.interface';
import { Logger } from '@/interfaces/logger.interface';
import { INJECTION_TOKENS } from '@/interfaces/constants/injection-tokens';

@Injectable()
export class InMemoryTransactionRepository implements TransactionRepository {
  private transactions: Transaction[] = [];

  constructor(
    @Inject(INJECTION_TOKENS.LOGGER)
    private readonly logger: Logger,
  ) {}

  async add(transaction: Transaction): Promise<void> {
    this.transactions.push(transaction);
    this.logger.log(`💾 Transação adicionada: id=${transaction.id}, total=${this.transactions.length}`);
  }

  async findAll(): Promise<Transaction[]> {
    this.logger.log(`🔍 Buscando todas as transações (${this.transactions.length})`);
    return this.transactions;
  }

  async deleteAll(): Promise<void> {
    this.logger.warn(`🗑️ Todas as transações foram apagadas (${this.transactions.length})`);
    this.transactions = [];
  }

  async findRecent(seconds: number): Promise<Transaction[]> {
    const now = new Date();
    const cutoff = new Date(now.getTime() - seconds * 1000);
    const result = this.transactions.filter(t => new Date(t.timestamp) >= cutoff);
    this.logger.log(`⏱️ Encontradas ${result.length} transações nos últimos ${seconds} segundos`);
    return result;
  }
}

