import axios, { AxiosError } from 'axios';
import { NextServer } from 'next/dist/server/next';

export type ApiError = AxiosError<{ error: string }>

export const api = axios.create({
  baseURL: 'https://notehub-api.goit.study',
  withCredentials: true,
});


