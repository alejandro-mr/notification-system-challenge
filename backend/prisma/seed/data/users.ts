import { User, NotificationType } from '@prisma/client';

export const USERS: { [key: string]: User } = {
  john: {
    id: 1,
    email: 'john@challenge.dev',
    name: 'John Doe',
    password: 'develop',
    phoneNumber: '124567890',
    channels: [NotificationType.EMAIL, NotificationType.PUSH],
    createdAt: undefined,
    updatedAt: undefined,
  },
  jane: {
    id: 2,
    email: 'jane@challenge.dev',
    name: 'Jane Doe',
    password: 'develop',
    phoneNumber: '0987654321',
    channels: [NotificationType.SMS],
    createdAt: undefined,
    updatedAt: undefined,
  },
  bob: {
    id: 3,
    email: 'bob@challenge.dev',
    name: 'Bob',
    password: 'develop',
    phoneNumber: '1236547809',
    channels: [NotificationType.SMS, NotificationType.EMAIL],
    createdAt: undefined,
    updatedAt: undefined,
  },
};
