import { CreateTransactionUseCase } from '../create-transaction.use-case';
import { TransactionRepository } from '../../../domain/repositories/transaction-repository.interface';
import { Logger } from '../../../domain/interfaces/logger.interface';
import { UnprocessableEntityException } from '@nestjs/common';

describe('CreateTransactionUseCase', () => {
  let useCase: CreateTransactionUseCase;
  let mockRepository: jest.Mocked<TransactionRepository>;
  let mockLogger: jest.Mocked<Logger>;

  beforeEach(() => {
    mockRepository = {
      add: jest.fn(),
      findAll: jest.fn(),
      deleteAll: jest.fn(),
    };

    mockLogger = {
      log: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    };

    useCase = new CreateTransactionUseCase(mockRepository, mockLogger);
  });

  it('deve criar uma transação com sucesso', async () => {
    const input = {
      amount: 100,
      timestamp: new Date().toISOString(),
    };

    const transaction = await useCase.execute(input);

    expect(transaction).toHaveProperty('id');
    expect(transaction.amount).toBe(input.amount);
    expect(transaction.timestamp.toISOString()).toBe(input.timestamp);
    expect(mockRepository.add).toHaveBeenCalledTimes(1);
    expect(mockLogger.log).toHaveBeenCalledWith(
      expect.stringContaining('Recebendo nova transação'),
    );
  });

  it('deve lançar erro se a transação estiver no futuro', async () => {
    const futureDate = new Date(Date.now() + 10000).toISOString();

    const input = {
      amount: 100,
      timestamp: futureDate,
    };

    await expect(useCase.execute(input)).rejects.toThrow(UnprocessableEntityException);
    expect(mockLogger.warn).toHaveBeenCalledWith(
      expect.stringContaining('Transação rejeitada: timestamp futuro'),
    );
    expect(mockRepository.add).not.toHaveBeenCalled();
  });
});
