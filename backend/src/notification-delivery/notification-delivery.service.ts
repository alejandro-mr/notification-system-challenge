import { Injectable } from '@nestjs/common';
import { NotificationStrategy } from './strategies/notification-strategy';
import { Notification, NotificationType, User } from '@prisma/client';
import { SmsStrategy } from './strategies/sms.strategy';
import { EmailStrategy } from './strategies/email.strategy';
import { PushStrategy } from './strategies/push.strategy';

@Injectable()
export class NotificationDeliveryService {
  private deliveryStrategy: NotificationStrategy;

  constructor() {
    // Default strategy being Email.
    this.deliveryStrategy = new EmailStrategy();
  }

  public setStrategy(strategy: NotificationType) {
    switch (strategy) {
      case 'SMS':
        this.deliveryStrategy = new SmsStrategy();
        break;
      case 'EMAIL':
        this.deliveryStrategy = new EmailStrategy();
        break;
      case 'PUSH':
        this.deliveryStrategy = new PushStrategy(null);
        break;
    }
  }

  public deliver(notification: Notification): Promise<Notification> {
    return this.deliveryStrategy.deliver(notification);
  }
}
