import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { Request, Response } from 'express';
import * as express from 'express';
import { NextFunction } from 'connect';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });


  app.use('/payment/webhook', express.raw({ type: '*/*' }), (req: { body: any; }, res: any, next: () => void) => {
    (req as any).rawBody = req.body;  // gán buffer thô cho rawBody
    console.log('rawBody', (req as any).rawBody);
    next();
  });

  app.use((req: Request, res: Response, next: NextFunction) => {
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
