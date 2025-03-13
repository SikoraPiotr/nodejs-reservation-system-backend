import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from '../schemas/task.schema';
import * as xlsx from 'xlsx';
import * as fs from 'fs';
import { agenda } from '../agenda';



@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {
    this.defineAgendaJobs();
  }

  private defineAgendaJobs() {
    agenda.define('processFile', async (job) => {
      const { taskId, filePath } = job.attrs.data;
      await this.taskModel.updateOne({ taskId }, { status: 'IN_PROGRESS' });

      try {
        const workbook = xlsx.readFile(filePath);
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = xlsx.utils.sheet_to_json(sheet);

        const errorReport: any[] = [];

        for (const row of data) {
          const { reservation_id, guest_name, status, check_in_date, check_out_date } = row ;

          if (!reservation_id || !guest_name || !status || !check_in_date || !check_out_date) {
            errorReport.push({ row, reason: 'Brak wymaganych pól' });
            continue;
          }

          if (!['oczekująca', 'zrealizowana', 'anulowana'].includes(status)) {
            errorReport.push({ row, reason: 'Nieprawidłowy status rezerwacji' });
            continue;
          }
        }

        await this.taskModel.updateOne({ taskId }, { status: 'COMPLETED', errorReport });
      } catch (error) {
        await this.taskModel.updateOne({ taskId }, { status: 'FAILED', errorReport: { error: error.message } });
      }
    });
  }

  async createTask(file: Express.Multer.File): Promise<{ taskId: string }> {
    const filePath = `uploads/${file.filename}`;
    fs.writeFileSync(filePath, file.buffer);

    const task = new this.taskModel({
      taskId: Date.now().toString(),
      filePath,
      status: 'PENDING',
    });

    await task.save();

    await agenda.schedule(new Date(), 'processFile', { taskId: task.taskId, filePath });

    return { taskId: task.taskId };
  }

  async getTaskStatus(taskId: string): Promise<Task | null> {
    return this.taskModel.findOne({ taskId });
  }
}
