import { api } from "@/app/api/api";
import type { Note }from "../../types/note";
import { User } from "@/types/user";


interface FetchNotesResponse {
    notes: Note[]; 
    totalPages: number;
}

export interface CreateNotePayload {
    title: string;
    content: string;
    tag: string;
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

export const createNote = async (payload: CreateNotePayload): Promise<Note> => {
  const response = await api.post<Note>("", payload);
  return response.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const response = await api.delete<Note>(`/${noteId}`);
  return response.data;
}

export type RegisterRequest = {
  email: string;
  password: string;
};


export const register = async (data: RegisterRequest) => {
   const res = await api.post<User>('/auth/register', data);
   return res.data;
}


export type LoginRequest = {
  email: string;
  password: string;
};

export const login = async (data: LoginRequest) => {
   const res = await api.post<User>('/auth/login', data);
   return res.data;
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

export const logout = async (): Promise<void> => {
   await api.post('/auth/logout');
}

export type UpdateUserRequest = {
  username?: string;
  photoUrl?: string;
};

export const updateMe = async (payload: UpdateUserRequest) => {
  const res = await api.put<User>('/auth/me', payload);
  return res.data;
};

export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  const { data } = await api.post('/upload', formData);
  return data.url;
};

