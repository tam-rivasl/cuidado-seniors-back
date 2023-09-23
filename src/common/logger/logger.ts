import { ConsoleLogger } from '@nestjs/common';
import Winston, { format, transports, createLogger } from 'winston';

export class LoggerWinston extends ConsoleLogger {
  logger: Winston.Logger;

  constructor() {
    super();
    const transport = new transports.Console();
    this.logger = createLogger({
      level: 'info',
      format: format.combine(format.json()),
      transports: [transport],
    });
  }
  now(): number {
    const now = new Date();
    return now.getTime();
  }

  log(message: any, ctx: string): void {
    if (typeof message === 'string') {
      this.logger.info({
        stringMessage: message,
        loggerName: ctx,
        timeMillis: this.now(),
      });
    } else {
      this.logger.info({
        jsonMessage: message,
        loggerName: ctx,
        timeMillis: this.now(),
      });
    }
  }

  debug(message: any, context?: string) {
    if (typeof message === 'string') {
      this.logger.debug({
        stringMessage: message,
        loggerName: context,
        timeMillis: this.now(),
      });
    } else {
      this.logger.debug({
        jsonMessage: message,
        loggerName: context,
        timestamp: this.now(),
      });
    }
  }

  error(message: any, trace?: string, ctx?: string): void {
    if (typeof message === 'string') {
      this.logger.error({
        stringMessage: message,
        loggerName: ctx,
        trace,
        timeMillis: this.now(),
      });
    } else {
      this.logger.error({
        jsonMessage: message,
        loggerName: ctx,
        timeMillis: this.now(),
      });
    }
  }

  writeLog(level: string, body: any): void {
    this.logger.log(level, body);
  }
}
