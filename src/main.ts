import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true, // Removes Non whitelist properties from the request before the service
      forbidNonWhitelisted: true, // Blocks the request if have Non whitelist properties
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  await app.listen(3000);
}
bootstrap();
