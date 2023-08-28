
import axios, { AxiosResponse } from "axios";
;
import { capitalize, isArray } from "lodash";
import { toast } from "sonner";

const baseURL = process.env.NEXT_PUBLIC_API_URL

const http = axios.create({
  baseURL: `${baseURL}/v1`,
  withCredentials: true,
});

http.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

http.interceptors.response.use(
  (response: AxiosResponse) => {
    // if (response.data.message) toast.success(response.data.message)
    return response
  },
  async (error) => {
    if (error.response?.data?.message) {
      if (isArray(error.response?.data?.message)) {
        error.response?.data?.message.forEach((message: string) =>
          toast.error(capitalize(message))
        );
      }
    }
    if (error.response?.status === 401 || error.response?.status === 403) {
      // await logout();
      // window.location.reload()
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
