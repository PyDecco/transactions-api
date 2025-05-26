import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PinoLogger } from './infra/logger/logger.service';
import * as dotenv from 'dotenv';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

dotenv.config();

async function bootstrap() {
  const logger = new PinoLogger();

  const app = await NestFactory.create(AppModule, {
    logger,
  });

  app.setGlobalPrefix('api');
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Transactions API')
    .setDescription('API para registro e análise de transações')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);

  logger.log(`🚀 Application is running on http://localhost:${port}`);
  logger.log(`📚 Swagger available at http://localhost:${port}/api/docs`);
}
bootstrap();

