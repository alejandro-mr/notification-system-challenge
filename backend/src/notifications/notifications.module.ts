import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { SportsConsumer } from './consumers/sports.consumer';
import { FinanceConsumer } from './consumers/finance.consumer';
import { MoviesConsumer } from './consumers/movies.consumer';
import { NotificationLogService } from 'src/notification-log/notification-log.service';
import { NotificationDeliveryService } from 'src/notification-delivery/notification-delivery.service';

@Module({
  imports: [
    /*
      NOTE: This register one queue topic for each notification category, if it needs to be extended to support new categories, it's recommended to create a service/controller offering an endpoint to regiser new queues.
     */
    BullModule.registerQueue(
      { name: 'Sports' },
      { name: 'Finance' },
      { name: 'Movies' },
    ),
  ],
  providers: [
    NotificationsService,
    PrismaService,
    SportsConsumer,
    FinanceConsumer,
    MoviesConsumer,
    NotificationLogService,
    NotificationDeliveryService,
  ],
  controllers: [NotificationsController],
})
export class NotificationsModule {}
