import axios from "axios";
import type { Note }from "../../types/note";
import { User } from "@/types/user";

const nextServer = axios.create({
baseURL: "https://notehub-api.goit.study",
 withCredentials: true,
})

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

export const createNote = async (payload: CreateNotePayload): Promise<Note> => {
  const response = await nextServer.post<Note>("", payload);
  return response.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const response = await nextServer.delete<Note>(`/${noteId}`);
  return response.data;
}

export type RegisterRequest = {
  email: string;
  password: string;
};


export const register = async (data: RegisterRequest) => {
   const res = await nextServer.post<User>('/auth/register', data);
   return res.data;
}


export type LoginRequest = {
  email: string;
  password: string;
};

export const login = async (data: LoginRequest) => {
   const res = await nextServer.post<User>('/auth/login', data);
   return res;
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

export const logout = async (): Promise<void> => {
   await nextServer.post('/auth/logout');
}

export type UpdateUserRequest = {
  username?: string;
  photoUrl?: string;
};

export const updateMe = async (payload: UpdateUserRequest) => {
  const res = await nextServer.put<User>('/auth/me', payload);
  return res.data;
};

export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  const { data } = await nextServer.post('/upload', formData);
  return data.url;
};