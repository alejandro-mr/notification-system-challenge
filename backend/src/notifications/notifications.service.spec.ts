import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsService } from './notifications.service';
import { PrismaService } from '../prisma/prisma.service';
import { getQueueToken } from '@nestjs/bull';

export const mockBullQueue: any = {
  add: jest.fn(),
  process: jest.fn(),
};

describe('NotificationsService', () => {
  let service: NotificationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationsService,
        PrismaService,
        {
          provide: getQueueToken('Sports'),
          useValue: mockBullQueue,
        },
        {
          provide: getQueueToken('Finance'),
          useValue: mockBullQueue,
        },
        {
          provide: getQueueToken('Movies'),
          useValue: mockBullQueue,
        },
      ],
    }).compile();

    service = module.get<NotificationsService>(NotificationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
