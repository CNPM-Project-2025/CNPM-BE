import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { Request, Response } from 'express';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  app.use('/payment/webhook', express.raw({ type: '*/*' }));

  app.use((req, res, next) => {
    if (req.originalUrl === '/payment/webhook') {
      return next(); // skip json parser for webhook
    }
    express.json()(req, res, next);
  });

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.useStaticAssets(join(__dirname, '..', '..', 'uploads/'), {
    prefix: '/uploads/',
  });

  const config = new DocumentBuilder()
    .setTitle('Blog APIs')
    .setDescription('List APIs for simple Blog by NXB Dev')
    .setVersion('1.0')
    .addTag('Users')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  console.log('Serving static files from:', join(__dirname, '..', '..', 'uploads'));
  await app.listen(process.env.PORT ?? 9999);
}
bootstrap();
