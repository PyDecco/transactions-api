import {
    Body,
    Controller,
    Post,
    HttpCode,
    HttpStatus,
    UsePipes,
    ValidationPipe,
    Delete,
    Get,
  } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBody, ApiOkResponse } from '@nestjs/swagger';

import { CreateTransactionDto } from '@/controllers/dtos/create-transaction.dto';
import { StatisticsResponseDto } from './dtos/statistics-response.dto';

import { CreateTransactionUseCase } from '@/use-cases/create-transaction.use-case';
import { DeleteAllTransactionsUseCase } from '@/use-cases/delete-all-transactions.use-case';
import { GetStatisticsUseCase } from '@/use-cases/get-statistics.use-case';
  
  @ApiTags('transactions')
  @Controller('transactions')
  export class TransactionsController {
    constructor(
      private readonly getStatisticsUseCase: GetStatisticsUseCase,
      private readonly createTransactionUseCase: CreateTransactionUseCase,
      private readonly deleteAllTransactionsUseCase: DeleteAllTransactionsUseCase,
    ) {}
  
    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UsePipes(new ValidationPipe({ whitelist: true }))
    @ApiBody({ type: CreateTransactionDto })
    @ApiResponse({ status: 201, description: 'Transação aceita e registrada.' })
    @ApiResponse({ status: 422, description: 'Transação rejeitada por violar alguma regra.' })
    @ApiResponse({ status: 400, description: 'JSON malformado ou inválido.' })
    async create(@Body() dto: CreateTransactionDto) {
      const transaction = await this.createTransactionUseCase.execute(dto);
      return transaction;
    }

    @Delete()
    @ApiOkResponse({
      type: String,
      description: 'Delete todas as transações',
    })
    async deleteAll() {
      await this.deleteAllTransactionsUseCase.execute();
      return { message: 'Todas as transações foram apagadas com sucesso.' };
    }

    @Get('/statistics')
    @ApiOkResponse({
      type: StatisticsResponseDto,
      description: 'Estatísticas das transações dos últimos 60 segundos',
    })
    async getStats(): Promise<StatisticsResponseDto> {
      return this.getStatisticsUseCase.execute();
    }  
  }
  