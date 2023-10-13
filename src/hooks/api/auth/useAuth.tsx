import { useToken } from '@/hooks/use-token';
import { userClient } from '@/services/user.service';
import { getFormErrors } from '@/utils/api/http';
import { authorizationAtom } from '@/utils/authorization-atom';
import {
  TChangePassword,
  TLogin,
  TSignup,
  TVerify,
  changePasswordSchema,
  loginSchema,
  signupSchema,
  verfifyEmailSchema,
} from '@/validations/auth';
import { zodResolver } from '@hookform/resolvers/zod';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export function useAuth() {
  const router = useRouter();
  const { setToken, removeToken } = useToken();
  const [_, setAuthorized] = useAtom(authorizationAtom);

  const queryClient = useQueryClient();
  const {
    mutateAsync: signupMutation,
    isLoading: SignupLoading,
    isError: IsSignupError,
  } = useMutation(userClient.register);
  const {
    mutateAsync: changePasswordMutation,
    isLoading: changePasswordLoading,
    isError: IsChangePasswordError,
  } = useMutation(userClient.changePassword);
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
  const changePasswordForm = useForm<TChangePassword>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
     newPassword: '',
     newPasswordConfirm: '',
     oldPassword: '',
    },
  });
  const verifyForm = useForm<TVerify>({
    resolver: zodResolver(verfifyEmailSchema),
  });
  const registerForm = useForm<TSignup>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      passwordConfirm: '',
    },
  });
  const attemptToLogin = async (data: TLogin) => {
    toast.promise(loginMutation(data), {
      loading: 'login...',
      success: data => {
        setAuthorized(true)
        setToken(data.token);
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
  const attemptToChangePassword = async (data: TChangePassword) => {
    toast.promise(changePasswordMutation(data), {
      loading: 'changing...',
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
        setToken(data.token);
        setAuthorized(true)
        // if (data.user.r === 'customer') {
        //   router.push('/');
        // }
        router.push('/');
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

  const logout = async () => {
    try {
      toast.promise(logoutMutation(), {
        loading: 'Logging out...',
        success: data => {
          removeToken();
          // setIsAuthenticated(false)
          router.push(`${window.location.origin}/?redirect=false`);
          queryClient.resetQueries(['me']);
          queryClient.resetQueries();
          queryClient.removeQueries();
          setToken('');
        setAuthorized(false)
          return <b>{data.message}</b>;
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
    changePasswordForm,
    attemptToChangePassword,
    changePasswordLoading,
    IsChangePasswordError,
  };
}
