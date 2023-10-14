import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggerWinston } from './common/logger/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new LoggerWinston(),
  });
  app.enableCors({
    origin: true,
    allowedHeaders:
      'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe, Accept-Encoding, Accept-Language, Host, Origin, User-Agent',
    methods: 'GET,PUT,POST,PATCH,DELETE,UPDATE,OPTIONS',
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
