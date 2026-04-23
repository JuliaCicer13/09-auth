import { cookies } from 'next/headers';
import { nextServer } from './api';
import { User } from './clientApi';
import type { Note }from "../../types/note";

export const getServerMe = async (): Promise<User> => {

const cookieStore = await cookies();
const { data } = await nextServer.get('/auth/me', {
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
  const response = await nextServer.get<FetchNotesResponse>("", {
    params: {
      search,
      page,
      tag,
    },
  });
  return response.data;
};


export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await nextServer.get<Note>(`/${id}`);
  return response.data;
};

type CheckSessionRequest = {
  success: boolean;
};

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionRequest>('/auth/session');
  return res.data.success;
}

export const getMe = async () => {
  const {data} = await nextServer.get<User>('/auth/me');
  return data;
}