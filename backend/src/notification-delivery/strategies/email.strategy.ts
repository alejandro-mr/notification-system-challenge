import { NotificationStrategy } from './notification-strategy';
import { Notification } from '@prisma/client';

export class EmailStrategy implements NotificationStrategy {
  async deliver(notification: Notification): Promise<Notification> {
    /*
      Sends notification through external mailing service
      ex.

      this.mailingService.send(notification);
    */
    return notification;
  }
}
