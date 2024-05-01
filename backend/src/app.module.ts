import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { NotificationsModule } from './notifications/notifications.module';
import { NotificationLogService } from './notification-log/notification-log.service';
import { NotificationDeliveryService } from './notification-delivery/notification-delivery.service';

@Module({
  imports: [
    UsersModule,
    NotificationsModule,
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, UsersService, NotificationLogService, NotificationDeliveryService],
})
export class AppModule {}
