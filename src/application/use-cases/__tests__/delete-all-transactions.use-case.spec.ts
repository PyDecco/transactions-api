import { DeleteAllTransactionsUseCase } from '../delete-all-transactions.use-case';
import { TransactionRepository } from '../../../domain/repositories/transaction-repository.interface';
import { Logger } from '../../../domain/interfaces/logger.interface';

describe('DeleteAllTransactionsUseCase', () => {
  let useCase: DeleteAllTransactionsUseCase;
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

    useCase = new DeleteAllTransactionsUseCase(mockRepository, mockLogger);
  });

  it('deve deletar todas as transações com sucesso', async () => {
    await useCase.execute();

    expect(mockRepository.deleteAll).toHaveBeenCalledTimes(1);
    expect(mockLogger.log).toHaveBeenCalledWith(expect.stringContaining('Removendo todas as transações'));
    expect(mockLogger.log).toHaveBeenCalledWith(expect.stringContaining('Todas as transações foram removidas'));
  });
});
