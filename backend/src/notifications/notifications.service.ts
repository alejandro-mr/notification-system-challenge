import { Injectable } from '@nestjs/common';
import {
  Prisma,
  Notification,
  NotificationCategory,
  NotificationLog,
} from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {}

  async createNotification(
    data: Prisma.NotificationCreateInput,
  ): Promise<Notification> {
    return this.prisma.notification.create({
      data,
    });
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
