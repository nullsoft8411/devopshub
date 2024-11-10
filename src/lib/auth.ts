import { jwtDecode } from 'jwt-decode';
import { api } from './axios';
import { User } from '@/types/auth';

interface LoginResponse {
  user: User;
  access_token: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>('/auth/login', {
    email,
    password,
  });
  return response.data;
}

export async function register(data: RegisterData): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>('/auth/register', data);
  return response.data;
}

export async function logout(): Promise<void> {
  await api.post('/auth/logout');
}

export function isValidToken(token: string | null): boolean {
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    return decoded.exp ? decoded.exp > currentTime : false;
  } catch {
    return false;
  }
}

export function setAuthToken(token: string | null) {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    localStorage.setItem('token', token);
  } else {
    delete api.defaults.headers.common.Authorization;
    localStorage.removeItem('token');
  }
}