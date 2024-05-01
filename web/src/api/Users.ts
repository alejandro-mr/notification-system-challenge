import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_NOTIFICATIONS_BACKEND_URL;

export const getUsers = async () => {
  try {
    const { data } = await axios.get(BACKEND_URL + 'users');
    return data;
  } catch (err) {
    return err;
  }
};
