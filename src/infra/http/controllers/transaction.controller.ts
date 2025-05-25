import {
    Body,
    Controller,
    Post,
    HttpCode,
    HttpStatus,
    UsePipes,
    ValidationPipe,
  } from '@nestjs/common';
  import { CreateTransactionDto } from '../dtos/create-transaction.dto';
  import { CreateTransactionUseCase } from '../../../application/use-cases/create-transaction.use-case';
  import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
  
  @ApiTags('transactions')
  @Controller('transactions')
  export class TransactionsController {
    constructor(
      private readonly createTransactionUseCase: CreateTransactionUseCase,
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
  }
  