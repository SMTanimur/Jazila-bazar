'use client';

import * as React from 'react';


import { Button } from '@/components/ui/button';
import {
  Form
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { Icons } from '../ui/icons';
import { useAuth } from '@/hooks/api/auth/useAuth';

type Props = {
  token: string;
};

export function VerifyEmailForm({ token }: Props) {
  const { verifyForm, VerifyLoading, IsVerifyError, attemptToVerifyEmail } =
    useAuth();
  return (
      <form
        onSubmit={(...args) =>
          attemptToVerifyEmail({ token: token })
        }
      >
        <Button disabled={VerifyLoading}>
          {VerifyLoading && (
            <Icons.spinner
              className='mr-2 h-4 w-4 animate-spin'
              aria-hidden='true'
            />
          )}
          Create account
          <span className='sr-only'>Create account</span>
        </Button>
      </form>
  );
}
