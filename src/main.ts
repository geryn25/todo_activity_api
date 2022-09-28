import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  
  

  
  console.log(process.env.MYSQL_HOST);
  await app.listen(3030);
  const logger = new Logger('NestApplication');
  logger.verbose(`Application is running on: ${await app.getUrl()}`);
  logger.verbose(`Application is running on: ${process.env.MYSQL_HOST}`);

}
bootstrap();
