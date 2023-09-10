import { ClientSession } from '@/configs/settings';
import { AUTH_TOKEN_KEY } from '@/constants';
import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const baseURL = process.env.NEXT_PUBLIC_API_URL;
const isServer = typeof window === 'undefined';
const http = axios.create({
  baseURL: `${baseURL}/v1`,
  timeout: 500000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Change request data/error here
http.interceptors.request.use(config => {
  const token = Cookies.get(AUTH_TOKEN_KEY);
  //@ts-ignore
  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${token ? token : ''}`,
  };
  return config;
});

// Change response data/error here
http.interceptors.response.use(
  response => response,
  error => {
    if (
      (error.response && error.response.status === 401) ||
      (error.response && error.response.status === 403) ||
      (error.response &&
        error.response.data.message === 'PICKBAZAR_ERROR.NOT_AUTHORIZED')
    ) {
      // Cookies.remove(AUTH_TOKEN_KEY);
      // Router.reload();
    }
    return Promise.reject(error);
  }
);
function formatBooleanSearchParam(key: string, value: boolean) {
  return value ? `${key}:1` : `${key}:`;
}

interface SearchParamOptions {
  categories: string;
  code: string;
  type: string;
  name: string;
  shop_id: string;
  is_approved: boolean;
  tracking_number: string;
  notice: string;
}

export class HttpClient {
  static async get<T>(url: string, params?: unknown) {
    const response = await http.get<T>(url, { params });
    return response.data;
  }

  static async post<T>(url: string, data: unknown, options?: any) {
    const response = await http.post<T>(url, data, options);
    return response.data;
  }

  static async put<T>(url: string, data: unknown) {
    const response = await http.put<T>(url, data);
    return response.data;
  }
  static async patch<T>(url: string, data: unknown) {
    const response = await http.patch<T>(url, data);
    return response.data;
  }

  static async delete<T>(url: string) {
    const response = await http.delete<T>(url);
    return response.data;
  }

  static formatSearchParams(params: Partial<SearchParamOptions>) {
    return Object.entries(params)
      .filter(([, value]) => Boolean(value))
      .map(([k, v]) =>
        ['type', 'categories', 'tags', 'author', 'manufacturer'].includes(k)
          ? `${k}.slug:${v}`
          : ['is_approved'].includes(k)
          ? formatBooleanSearchParam(k, v as boolean)
          : `${k}:${v}`
      )
      .join(';');
  }
}

export function getFormErrors(error: unknown) {
  if (axios.isAxiosError(error)) {
    return error.response?.data.message;
  }
  return null;
}

export function getFieldErrors(error: unknown) {
  if (axios.isAxiosError(error)) {
    return error.response?.data.errors;
  }
  return null;
}

export type ServerError = {
  path: string;
  message: string;
  timestamp: string;
  statusCode: number;
};
