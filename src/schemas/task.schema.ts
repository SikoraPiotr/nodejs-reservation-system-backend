import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema({ timestamps: true })
export class Task {
  @Prop({ required: true })
  taskId: string;

  @Prop({ required: true })
  filePath: string;

  @Prop({ enum: ['PENDING', 'IN_PROGRESS', 'COMPLETED', 'FAILED'], default: 'PENDING' })
  status: string;

  @Prop({ type: Object, default: {} })
  errorReport: Record<string, any>;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
