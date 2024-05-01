import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotificationLogService } from 'src/notification-log/notification-log.service';

@Processor('Sports')
export class SportsConsumer {
  constructor(
    private prisma: PrismaService,
    private notificationLogService: NotificationLogService,
  ) {}

  @Process()
  async handleNotification({ data: notification, queue }: Job) {
    // Get all users subscribed to `Sports` category
    const users = await this.prisma.userSubscription.findMany({
      where: {
        category: {
          category: queue.name,
        },
      },
      include: {
        user: {
          select: {
            id: true,
            channels: true,
          },
        },
      },
    });

    // Get notification channels from each subscribed user.
    for (const { user } of users) {
      const { id: userId, channels } = user;

      for (const channel of channels) {
        /*
         Process notification based on user's channel (ex. Calling external service)
         I'm going to create a delivery service with differnt strategies per channel, in order to abstract the delivery process and only use a common interface.

         ex. this.notificationDelivery.setStrategy(channel);
         ex. this.notificationDelivery.deliver(notification);
         */

        // Saving NotificationLog to record processed notification.
        await this.notificationLogService.createNotificationLog({
          channel,
          user: {
            connect: {
              id: userId,
            },
          },
          notification: {
            connect: {
              id: notification.id,
            },
          },
          sentAt: new Date().toISOString(),
        });
      }
    }
  }
}
