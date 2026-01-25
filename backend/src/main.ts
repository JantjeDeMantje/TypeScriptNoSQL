import { ValidationPipe } from '@nestjs/common';
import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: process.env.FRONTEND_ORIGIN?.split(',') ?? ['http://localhost:4200'],
      credentials: true,
    },
  });

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));

  const mongo = process.env.MONGO_URI;
  if (!mongo) {
    throw new Error('MONGO_URI not set');
  }
  Logger.log('Connecting to MongoDB...');
  await mongoose.connect(mongo, { serverSelectionTimeoutMS: 10000 });
  Logger.log('Connected to MongoDB');

  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');
  Logger.log(`🚀 Application is running on: http://localhost:${port}/api`);
}

bootstrap();


