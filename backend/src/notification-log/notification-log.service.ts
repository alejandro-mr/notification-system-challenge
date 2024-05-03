import { Injectable } from '@nestjs/common';
import { NotificationLog, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NotificationLogService {
  constructor(private prisma: PrismaService) {}

  async createNotificationLog(
    data: Prisma.NotificationLogCreateInput,
  ): Promise<NotificationLog> {
    return this.prisma.notificationLog.create({
      data,
    });
  }
}
