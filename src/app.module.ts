import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from './database.module';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})

@Module({
  imports: [DatabaseModule],
})
export class AppModule {}
