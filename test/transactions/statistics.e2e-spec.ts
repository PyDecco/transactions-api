import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('Statistics (e2e)', () => {
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

  it('deve retornar estatísticas zeradas inicialmente', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/transactions/statistics')
      .expect(200);

    expect(response.body).toEqual({
      count: 0,
      sum: 0,
      avg: 0,
      min: 0,
      max: 0,
    });
  });

  it('deve calcular estatísticas corretamente após criação de transações', async () => {
    await request(app.getHttpServer())
      .post('/api/transactions')
      .send({ amount: 100, timestamp: new Date().toISOString() })
      .expect(201);

    await request(app.getHttpServer())
      .post('/api/transactions')
      .send({ amount: 300, timestamp: new Date().toISOString() })
      .expect(201);

    const response = await request(app.getHttpServer())
      .get('/api/transactions/statistics')
      .expect(200);

    expect(response.body.count).toBe(2);
    expect(response.body.sum).toBe(400);
    expect(response.body.avg).toBe(200);
    expect(response.body.min).toBe(100);
    expect(response.body.max).toBe(300);
  });
});
