import { cookies } from 'next/headers';
import { nextServer } from './api';
import { User } from './clientApi';

export const  getServerMe = async (): Promise<User> => {

  const cookieStore = await cookies();
const { data } = await nextServer.get('/auth/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};