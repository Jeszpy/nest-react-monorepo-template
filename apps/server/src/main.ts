import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvEnum } from './enums/env.enum';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      stopAtFirstError: true,
    }),
  );
  const configService = app.get(ConfigService);
  const port = parseInt(configService.getOrThrow<string>(EnvEnum.PORT), 10);
  const logger = new Logger('Bootstrap');
  await app.listen(port, () => {
    logger.log(`App started at ${port} port`);
  });
}

bootstrap();
