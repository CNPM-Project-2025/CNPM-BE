import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  const config = new DocumentBuilder()
    .setTitle('Blog APIs')
    .setDescription('List APIs for simple Blog by NXB Dev')
    .setVersion('1.0')
    .addTag('Users')
    .addBearerAuth()
    // .addCors()
    .build(); // nest swagger

  app.useStaticAssets(join(__dirname, '..', '..', 'uploads/'), {
    prefix: '/uploads/',
  });

  app.enableCors({
    origin: '*', // Chỉ cho phép frontend từ localhost:5173
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Các phương thức HTTP được phép
    credentials: true, // Chấp nhận cookies từ frontend
  });

  // Serve thư mục uploads

  console.log('Serving static files from:', join(__dirname, '..', 'uploads'));
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT ?? 9999);
}
bootstrap();
