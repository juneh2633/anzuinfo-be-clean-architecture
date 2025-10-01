import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import expressBasicAuth from 'express-basic-auth';
import { HttpErrorFilter } from './presentation/http/common/filter/HttpErrorFilter';
import { setupSwagger } from './presentation/http/common/swagger';
import { HttpLoggingInterceptor } from './presentation/http/common/logging.interceptor';

// Load environment variables from .env file
dotenv.config();

async function bootstrap() {

  const SWAGGER_USER = process.env.SWAGGER_USER ?? 'admin';
  const SWAGGER_PASSWORD = process.env.SWAGGER_PASSWORD ?? 'admin';
  const HTTP_PORT = process.env.PORT ?? 3000;
  const app = await NestFactory.create(AppModule);
  // const prismaService = app.get(PrismaService);
  // await prismaService.enableShutdownHooks(app);
  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
  app.use(
    '/api/docs',
    expressBasicAuth({
      challenge: true,
      users: {
        [SWAGGER_USER]: SWAGGER_PASSWORD,
      },
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
      transform: true,
    }),
  );

  setupSwagger(app);

  app.useGlobalFilters(new HttpErrorFilter());
  app.useGlobalInterceptors(new HttpLoggingInterceptor());

  await app.listen(HTTP_PORT);
}
bootstrap();
