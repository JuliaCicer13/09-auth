import { cookies } from 'next/headers';
import { User } from '@/types/user';
import type { Note }from "../../types/note";
import { api } from '@/app/api/api';

export const getServerMe = async (): Promise<User> => {

const cookieStore = await cookies();
const { data } = await api.get('/users/me', {
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
  const cookieStore = await cookies();
  const response = await api.get<FetchNotesResponse>("/notes", {
    params: {
      search,
      page,
      tag,
    },
      headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
};


export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookieStore = await cookies();
  const response = await api.get<Note>("/notes", {
      headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
};

type CheckSessionRequest = {
  success: boolean;
};

export const checkSession = async () => {
   const cookieStore = await cookies();
  return await api.get<CheckSessionRequest>('/auth/session',{
       headers: {
      Cookie: cookieStore.toString(),
    },
  });
  
}

export const getMe = async () => {
  const cookieStore = await cookies();
  return await api.get<User>('/users/me',
    {
       headers: {
      Cookie: cookieStore.toString(),
    },
    }
  );
 
}

export const getServerMeFull = async () => {
  const cookieStore = await cookies();
 
  return await api.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
};