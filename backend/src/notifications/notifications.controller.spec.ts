import { Test, TestingModule } from '@nestjs/testing';
import { getQueueToken } from '@nestjs/bull';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { PrismaService } from '../prisma/prisma.service';

export const mockBullQueue: any = {
  add: jest.fn(),
  process: jest.fn(),
};

describe('NotificationsController', () => {
  let controller: NotificationsController;
  let service: NotificationsService;

  const mockPrismaService = {
    notificationCategory: {
      findMany: jest.fn(),
    },
    notificationLog: {
      findManu: jest.fn(),
    },
    notification: {
      findMany: jest.fn(),
      create: jest.fn(),
    },
  };

  const mockBullQueue = {
    add: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationsController],
      providers: [
        NotificationsService,
        { provide: PrismaService, useValue: mockPrismaService },
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

    controller = module.get<NotificationsController>(NotificationsController);
    service = module.get<NotificationsService>(NotificationsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all notification categories', async () => {
    const notificationCategories = [
      {
        category: 'CategoryA',
      },
    ];

    mockPrismaService.notificationCategory.findMany.mockImplementation(() =>
      Promise.resolve(notificationCategories),
    );

    expect(await controller.getNotificationCategories()).toBe(
      notificationCategories,
    );
  });
});
