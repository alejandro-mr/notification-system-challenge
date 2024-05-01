import { NotificationStrategy } from './notification-strategy';
import { Notification } from '@prisma/client';

export class PushStrategy implements NotificationStrategy {
  private user: any;

  constructor(user: any) {
    this.user = user;
  }
  async deliver(notification: Notification): Promise<Notification> {
    /*
      Sends notification through external Push message service, based on platform
      ex.

      switch (this,user.platform) {
        case 'android':
          this.fcmService.sendNotification(deviceToken, notification);
          break;
        case 'ios':
          ths.apnService.sendNotification(deviceToken, notification);
          break;
      }
    */

    return notification;
  }
}
