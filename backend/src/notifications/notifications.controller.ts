import { Controller, Get, Post, Body } from '@nestjs/common';
import {
  NotificationCategory,
  Notification,
  NotificationLog,
} from '@prisma/client';
import { NotificationsService } from './notifications.service';
import { NotificationCreateRequestDto } from './dto/notification_create_request.dto';
import { SkipAuth } from 'src/skip-auth/skip-auth.decorator';

@Controller('notifications')
export class NotificationsController {
  constructor(private notificationsService: NotificationsService) {}

  @SkipAuth()
  @Get('categories')
  async getNotificationCategories(): Promise<NotificationCategory[]> {
    return this.notificationsService.getNotificationCategories({});
  }

  @SkipAuth()
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

  @SkipAuth()
  @Get('log')
  async getNotificationsLog(): Promise<NotificationLog[]> {
    return this.notificationsService.getNotificationsLog({});
  }
}
