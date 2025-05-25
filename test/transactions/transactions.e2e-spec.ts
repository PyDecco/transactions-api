import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('TransactionsController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('deve criar uma transação com sucesso', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/transactions')
      .send({
        amount: 123.45,
        timestamp: new Date().toISOString(),
      })
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.amount).toBe(123.45);
  });

  it('deve retornar 422 para transação com timestamp futuro', async () => {
    const future = new Date(Date.now() + 100000).toISOString();

    await request(app.getHttpServer())
      .post('/api/transactions')
      .send({
        amount: 100,
        timestamp: future,
      })
      .expect(422);
  });

  it('deve retornar 400 para payload inválido', async () => {
    await request(app.getHttpServer())
      .post('/api/transactions')
      .send({
        amount: 'not-a-number',
        timestamp: 'not-a-date',
      })
      .expect(400);
  });
});
