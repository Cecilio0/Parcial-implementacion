import 'dotenv/config';
import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const PORT: string = process.env.PORT;
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const config = new DocumentBuilder()
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  await app.listen(PORT);
}
bootstrap();
