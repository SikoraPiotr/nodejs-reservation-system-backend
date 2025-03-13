import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BullModule } from '@nestjs/bull';
import { Task, TaskSchema } from '../schemas/task.schema';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    BullModule.registerQueue({ name: 'taskQueue' }),
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
