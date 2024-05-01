import axios, { AxiosError } from 'axios';

type CreateNotificationPayload = {
  category: number;
  message: string;
};

const BACKEND_URL = import.meta.env.VITE_NOTIFICATIONS_BACKEND_URL;

export const getNoticiationCategories = async () => {
  try {
    const { data } = await axios.get(BACKEND_URL + 'notifications/categories');
    return data;
  } catch (err) {
    return err;
  }
};

export const getNotificationsLog = async () => {
  try {
    const { data } = await axios.get(BACKEND_URL + 'notifications/log');
    return data;
  } catch (err) {
    return err;
  }
};

export const createNotification = async ({
  category,
  message,
}: CreateNotificationPayload) => {
  try {
    const { data } = await axios.post(BACKEND_URL + 'notifications', {
      category,
      message,
    });

    return data;
  } catch (err) {
    if (err instanceof AxiosError) {
      return err.response?.data;
    }
  }
};
