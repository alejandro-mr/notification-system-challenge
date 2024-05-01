import axios, { AxiosError } from 'axios';

type LoginPayload = {
  email: string;
  password: string;
};

const BACKEND_URL = import.meta.env.VITE_NOTIFICATIONS_BACKEND_URL;

export const Login = async ({ email, password }: LoginPayload) => {
  try {
    const { data } = await axios.post(BACKEND_URL + 'auth/login', {
      email,
      password,
    });

    return data;
  } catch (err) {
    if (err instanceof AxiosError) {
      return err.response?.data;
    }
  }
};
