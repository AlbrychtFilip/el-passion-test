import { NestFactory } from '@nestjs/core';
import { MainModule } from './main.module';
import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { getFromContainer, MetadataStorage } from 'class-validator';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { ValidationPipe } from '@nestjs/common';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(MainModule);
  // swagger
  const swaggerConfig = new DocumentBuilder().setTitle('Vaneau neuf swagger').build();

  const document = await SwaggerModule.createDocument(app, swaggerConfig);

  // Creating all the swagger schemas based on the class-validator decorators
  const metadatas = (getFromContainer(MetadataStorage) as any).validationMetadatas;
  document['definitions'] = validationMetadatasToSchemas(metadatas);

  app.useGlobalPipes(new ValidationPipe());
  SwaggerModule.setup('/swagger', app, document);
  await app.listen(3000);
}
bootstrap();
