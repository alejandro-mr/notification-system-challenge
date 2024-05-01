import { Controller, Get, Post, Body } from '@nestjs/common';
import {
  NotificationCategory,
  Notification,
  NotificationLog,
} from '@prisma/client';
import { NotificationsService } from './notifications.service';
import { NotificationCreateRequestDto } from './dto/notification_create_request.dto';

@Controller('notifications')
export class NotificationsController {
  constructor(private notificationsService: NotificationsService) {}

  @Get('categories')
  async getNotificationCategories(): Promise<NotificationCategory[]> {
    return this.notificationsService.getNotificationCategories({});
  }

  @Post('/')
  async createNotification(
    @Body() notificationData: NotificationCreateRequestDto,
  ): Promise<Notification> {
    const { category, message } = notificationData;
    return this.notificationsService.createNotification({
      message,
      category: {
        connect: {
          id: parseInt(category),
        },
      },
    });
  }

  @Get('log')
  async getNotificationsLog(): Promise<NotificationLog[]> {
    return this.notificationsService.getNotificationsLog({});
  }
}
