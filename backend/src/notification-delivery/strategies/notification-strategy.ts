import { Notification } from '@prisma/client';

export interface NotificationStrategy {
  deliver(notification: Notification): Promise<Notification>;
}
