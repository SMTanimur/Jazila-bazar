import { API_ENDPOINTS } from '@/utils/api/api-endpoints';
import { HttpClient } from '@/utils/api/http';
import {
  TLogin,
  TSignup,
  TVerify,
  loginResponseSchema,
  mutationActivationResponse,
  mutationResponseSchema,
} from '@/validations/auth';
import { IUser } from '@/types';

export const userClient = {
  
  me: () => {
    return HttpClient.get<IUser>(`/users/${API_ENDPOINTS.ME}`);
  },
  login: (variables: TLogin) => {
    return HttpClient.post<loginResponseSchema>(
      `/auth/${API_ENDPOINTS.LOGIN}`,
      variables
    );
  },
  emailVerify: (variables: TVerify) => {
    return HttpClient.post<loginResponseSchema>(
      `/auth/${API_ENDPOINTS.ACTIVATE}`,
      variables
    );
  },
  logout: () => {
    return HttpClient.post<any>(`/auth/${API_ENDPOINTS.LOGOUT}`, {});
  },

  loginWithGoogle: (variables: { credential: string }) => {
    return HttpClient.post<loginResponseSchema>(
      `/auth/${API_ENDPOINTS.GOOGLE}`,
      variables
    );
  },


  register: (variables: TSignup) => {
    return HttpClient.post<mutationResponseSchema>(
      `/auth/${API_ENDPOINTS.REGISTER}`,
      variables
    );
  },
};
