import { NotificationStrategy } from './notification-strategy';
import { Notification } from '@prisma/client';

export class SmsStrategy implements NotificationStrategy {
  async deliver(notification: Notification): Promise<Notification> {
    /*
      Sends notification through external SMS service
      ex.

      this.smsService.send(notification);
    */
    return notification;
  }
}
