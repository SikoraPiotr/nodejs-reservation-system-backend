import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { startAgenda } from './agenda';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await startAgenda();
  await app.listen(process.env.PORT ?? 3000);
  console.log("is it already working?");
}
bootstrap();
