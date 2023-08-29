import { userClient } from '@/services/user';
import { getFormErrors } from '@/utils/api/http';
import {
  TLogin,
  TSignup,
  TVerify,
  loginSchema,
  signupSchema,
  verfifyEmailSchema,
} from '@/validations/auth';
import { zodResolver } from '@hookform/resolvers/zod';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export function useAuth() {
  const router = useRouter();

  const queryClient = useQueryClient();
  const {
    mutateAsync: signupMutation,
    isLoading: SignupLoading,
    isError: IsSignupError,
  } = useMutation(userClient.register);
  const {
    mutateAsync: loginMutation,
    isLoading: LoginLoading,
    isError: IsLoginError,
  } = useMutation(userClient.login);
  const {
    mutateAsync: logoutMutation,
    isLoading: LogoutLoading,
    isError: IsLogoutError,
  } = useMutation(userClient.logout);

  const {
    mutateAsync: VerifyMutation,
    isLoading: VerifyLoading,
    isError: IsVerifyError,
  } = useMutation(userClient.emailVerify);

  const loginForm = useForm<TLogin>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const verifyForm = useForm<TVerify>({
    resolver: zodResolver(verfifyEmailSchema)
  });
  const registerForm = useForm<TSignup>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
      passwordConfirm: '',
    },
  });
  const attemptToLogin = async (data: TLogin) => {
    toast.promise(loginMutation(data), {
      loading: 'login...',
      success: data => {
        router.push(`${window.location.origin}/`);
        return <b>{data.message}</b>;
      },
      error: error => {
        const {
          response: { data },
        }: any = error ?? {};

        return <b> {data?.message}</b>;
      },
    });
  };
  const attemptToRegister = async (data: TSignup) => {
    toast.promise(signupMutation(data), {
      loading: 'registering...',
      success: data => {
        return <b> {data.message}</b>;
      },
      error: error => {
        const {
          response: { data },
        }: any = error ?? {};

        return <b> {data.message}</b>;
      },
    });
  };
  const attemptToVerifyEmail = async (data: TVerify) => {
    toast.promise(VerifyMutation(data), {
      loading: 'verify...',
      success: data => {
        
        router.push('/signin')
        // if (data.role === 'customer') {
        //   router.push('/');
        // }
        return <b>{data.message}</b>;
        
      },
      error: error => {
        const {
          response: { data },
        }: any = error ?? {};

        return <b> {data.message}</b>;
      },
    });
  };

  const logout = async () => {
    try {
      toast.promise(logoutMutation(), {
        loading: 'Logging out...',
        success: () => {
          // setIsAuthenticated(false)
          router.push(`${window.location.origin}/?redirect=false`);
          queryClient.resetQueries(['me']);
          queryClient.resetQueries();
          queryClient.removeQueries();
          return <b>logout success</b>;
        },
        error: 'Failed to Logout!',
      });
    } catch (error) {
      console.error(error);
    }
  };

  return {
    loginMutation,
    attemptToLogin,
    LoginLoading,
    IsLoginError,
    loginForm,
    registerForm,
    attemptToRegister,
    SignupLoading,
    IsSignupError,
    verifyForm,
    VerifyLoading,
    IsVerifyError,
    attemptToVerifyEmail,
    logout,
    LogoutLoading,
    IsLogoutError,
  };
}
