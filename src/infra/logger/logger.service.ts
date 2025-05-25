import { LoggerService } from '@nestjs/common';
import pino from 'pino';

export class PinoLogger implements LoggerService {
  private logger = pino({ transport: { target: 'pino-pretty' } });

  log(message: string) {
    this.logger.info(message);
  }
  error(message: string, trace: string) {
    this.logger.error({ message, trace });
  }
  warn(message: string) {
    this.logger.warn(message);
  }
}
