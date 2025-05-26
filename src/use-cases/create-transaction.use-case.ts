import {
    Inject,
    Injectable,
    UnprocessableEntityException,
  } from '@nestjs/common';
  import { randomUUID } from 'crypto';
  import { Transaction } from '@/entities/transaction.entity';
  import { TransactionRepository } from '@/interfaces/transaction-repository.interface';
  import { INJECTION_TOKENS } from '@/interfaces/constants/injection-tokens';
  import { Logger } from '@/interfaces/logger.interface';
  import { CreateTransactionDto } from '@/controllers/dtos/create-transaction.dto';
  
  @Injectable()
  export class CreateTransactionUseCase {
    constructor(
      @Inject(INJECTION_TOKENS.TRANSACTION_REPOSITORY)
      private readonly transactionRepository: TransactionRepository,
      @Inject(INJECTION_TOKENS.LOGGER)
      private readonly logger: Logger,  
    ) {}
  
    async execute(input: CreateTransactionDto): Promise<Transaction> {
        this.logger.log(`Recebendo nova transação: amount=${input.amount}, timestamp=${input.timestamp}`);
      
        this.rejectFutureTimestamp(input.timestamp);
      
        const transaction = new Transaction(
          randomUUID(),
          input.amount,
          new Date(input.timestamp),
        );
      
        await this.transactionRepository.add(transaction);
      
        this.logger.log(`Transação criada com sucesso: id=${transaction.id}`);
      
        return transaction;
      }
      

    private rejectFutureTimestamp(timestamp: string) {
        const date = new Date(timestamp);
        const now = new Date();
        
        if (date > now) {
            this.logger.warn(`Transação rejeitada: timestamp futuro (${timestamp})`);
            throw new UnprocessableEntityException('A transação não pode estar no futuro.');
        }
    } 
}
  