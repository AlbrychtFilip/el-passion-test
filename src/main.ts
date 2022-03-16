import { NestFactory } from '@nestjs/core';
import { MainModule } from './main.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {ValidationPipe} from "@nestjs/common";
import {getFromContainer, MetadataStorage} from "class-validator";
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);
  app.useGlobalPipes(new ValidationPipe());

  setupSwagger(app);

  await app.listen(3000);
}
bootstrap();

function setupSwagger(app) {
  const swaggerConfig = new DocumentBuilder().setTitle('Bikeramp api').build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  const metadata = (getFromContainer(MetadataStorage) as any).validationMetadatas;
  document.components.schemas = Object.assign({}, document.components.schemas || {}, validationMetadatasToSchemas(metadata));

  SwaggerModule.setup('docs', app, document);
}