import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import {
  Prisma,
  Notification,
  NotificationCategory,
  NotificationLog,
} from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NotificationsService {
  private queues: Map<String, Queue>;

  constructor(
    private prisma: PrismaService,
    @InjectQueue('Sports') private sportsQueue: Queue,
    @InjectQueue('Finance') private financeQueue: Queue,
    @InjectQueue('Movies') private moviesQueue: Queue,
  ) {
    this.queues = new Map([
      ['Sports', this.sportsQueue],
      ['Finance', this.financeQueue],
      ['Movies', this.moviesQueue],
    ]);
  }

  async createNotification(
    data: Prisma.NotificationCreateInput,
  ): Promise<Notification> {
    const notification = await this.prisma.notification.create({
      data,
      include: {
        category: true,
      },
    });

    if (notification.id > 0) {
      const queue = this.queues.get(notification.category.category);
      if (queue) {
        // Notification is sent to the queue in a fire and forget manner.
        queue.add(notification);
      }
    }

    return notification;
  }

  async getNotifications(params: {
    where?: Prisma.NotificationWhereInput;
    orderBy?: Prisma.NotificationOrderByWithRelationInput;
  }): Promise<Notification[]> {
    const { where, orderBy } = params;
    return this.prisma.notification.findMany({
      where,
      orderBy,
    });
  }

  async getNotificationCategories(params: {
    where?: Prisma.NotificationCategoryWhereInput;
  }): Promise<NotificationCategory[]> {
    const { where } = params;
    return this.prisma.notificationCategory.findMany({
      where,
    });
  }

  async getNotificationsLog(params: {
    where?: Prisma.NotificationLogWhereInput;
    orderBy?: Prisma.NotificationLogOrderByWithRelationInput;
  }): Promise<NotificationLog[]> {
    const { where, orderBy } = params;
    return this.prisma.notificationLog.findMany({
      where,
      orderBy,
      include: {
        notification: {
          include: {
            category: true,
          },
        },
        user: true,
      },
    });
  }
}
