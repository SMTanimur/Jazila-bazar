'use client';

import * as React from 'react';
import { toast } from 'sonner';

import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { useToken } from '@/hooks/use-token';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

import { userClient } from '@/services/user.service';
import { isEmpty } from 'lodash';
import { LoginWithGoogleParams, loginResponseSchema } from '@/validations/auth';
import { ServerError } from '@/utils/api/http';
import { useAtom } from 'jotai';
import { authorizationAtom } from '@/utils/authorization-atom';

export function OAuthSignIn() {
  const { setToken, removeToken } = useToken();
  const [_, setAuthorized] = useAtom(authorizationAtom);
  const router = useRouter();

  const { mutateAsync: loginWithGoogleMutation } = useMutation<
    loginResponseSchema,
    ServerError,
    LoginWithGoogleParams
  >(userClient.loginWithGoogle);

  const handleLoginWithGoogle = async (response: CredentialResponse) => {
    if (response.credential) {
      await loginWithGoogleMutation(
        { credential: response.credential },
        {
          onSuccess: data => {
            removeToken();
            setToken(data.token);
            setAuthorized(true)
            router.push(`${window.location.origin}/`);
          
          },
          onError: err => {
            console.log(err);
          },
        }
      );
    }
  };

  const handleGoogleLoginError = () => {
    toast.error(
      "Google doesn't seem to be responding, please try logging in using email/password instead."
    );
  };
  return (
    <div className='w-full flex  justify-center'>
      <GoogleLogin onSuccess={handleLoginWithGoogle} onError={handleGoogleLoginError} size='large'/>
    </div>
  );
}
