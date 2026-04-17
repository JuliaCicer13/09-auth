import axios from "axios";
import type { Note }from "../types/note";


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
  userName: string;
};

export type User = {
  id: string;
  email: string;
  userName?: string;
  photoUrl?: string;
  createdAt: Date;
  updatedAt: Date;
};

export const register = async (data: RegisterRequest) => {
   const res = await nextServer.post<User>('/auth/register', data);
   return res;
}



export type LoginRequest = {
  username: string;
  email: string;
  password: string;
};

export const login = async (data: LoginRequest) => {
   const res = await nextServer.post<User>('/auth/login', data);
   return res;
};