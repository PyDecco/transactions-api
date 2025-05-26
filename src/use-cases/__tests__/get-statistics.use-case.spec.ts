import { GetStatisticsUseCase } from '@/use-cases/get-statistics.use-case';
import { TransactionRepository } from '@/interfaces/transaction-repository.interface';
import { Logger } from '@/interfaces/logger.interface';

describe('GetStatisticsUseCase', () => {
  let useCase: GetStatisticsUseCase;
  let mockRepository: jest.Mocked<TransactionRepository>;
  let mockLogger: jest.Mocked<Logger>;

  beforeEach(() => {
    mockRepository = {
      add: jest.fn(),
      findAll: jest.fn(),
      deleteAll: jest.fn(),
      findRecent: jest.fn(),
    };

    mockLogger = {
      log: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    };

    useCase = new GetStatisticsUseCase(mockRepository, mockLogger, 60);
  });

  it('deve retornar estatísticas corretas com transações', async () => {
    mockRepository.findRecent.mockResolvedValue([
      { id: '1', amount: 100, timestamp: new Date() },
      { id: '2', amount: 200, timestamp: new Date() },
      { id: '3', amount: 50, timestamp: new Date() },
    ]);

    const stats = await useCase.execute();

    expect(stats).toEqual({
      count: 3,
      sum: 350,
      avg: 116.66666666666667,
      min: 50,
      max: 200,
    });

    expect(mockLogger.log).toHaveBeenCalledWith(expect.stringContaining('Calculando estatísticas'));
    expect(mockLogger.log).toHaveBeenCalledWith(expect.stringContaining('Estatísticas calculadas'));
  });

  it('deve retornar tudo 0 se não houver transações', async () => {
    mockRepository.findRecent.mockResolvedValue([]);

    const stats = await useCase.execute();

    expect(stats).toEqual({
      count: 0,
      sum: 0,
      avg: 0,
      min: 0,
      max: 0,
    });
  });
});
