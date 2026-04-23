import { cookies } from 'next/headers';
import { User } from '@/types/user';
import type { Note }from "../../types/note";
import { api } from '@/app/api/api';

export const getServerMe = async (): Promise<User> => {

const cookieStore = await cookies();
const { data } = await api.get('/auth/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

interface FetchNotesResponse {
    notes: Note[];
    totalPages: number;
}

export const fetchNotes = async (
  search: string,
  page: number,
  tag?: string,
) : Promise<FetchNotesResponse> => {
  const response = await api.get<FetchNotesResponse>("", {
    params: {
      search,
      page,
      tag,
    },
  });
  return response.data;
};


export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await api.get<Note>(`/${id}`);
  return response.data;
};

type CheckSessionRequest = {
  success: boolean;
};

export const checkSession = async () => {
  const res = await api.get<CheckSessionRequest>('/auth/session');
  return res.data.success;
}

export const getMe = async () => {
  const {data} = await api.get<User>('/auth/me');
  return data;
}