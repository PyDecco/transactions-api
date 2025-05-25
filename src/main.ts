import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PinoLogger } from './infra/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new PinoLogger(),
  });

  app.setGlobalPrefix('api');
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
