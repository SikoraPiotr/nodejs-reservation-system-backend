import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from '../task.service.ts'
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

describe('TasksService', () => {
  let service: TasksService;
  let model: Model<any>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getModelToken('Task'),
          useValue: {
            create: jest.fn(),
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    model = module.get<Model<any>>(getModelToken('Task'));
  });

  it('Should add task record', async () => {
    const file = { buffer: Buffer.from('') };
    jest.spyOn(model, 'create').mockResolvedValueOnce({ taskId: 'test123' });

    const result = await service.createTask(file as any);
    
    expect(result.taskId).toBe('test123');
  });

  it('Should return status', async () => {
    jest.spyOn(model, 'findById').mockResolvedValueOnce({ status: 'DONE' });

    const result = await service.getTaskStatus('123');

    expect(result.status).toBe('DONE');
  });
});