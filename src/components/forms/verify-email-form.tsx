'use client';

import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { Icons } from '../ui/icons';
import { useAuth } from '@/hooks/api/auth/useAuth';
import Link from 'next/link';

type Props = {
  token: string;
};

export function VerifyEmailForm({ token }: Props) {
  const { VerifyLoading, attemptToVerifyEmail, IsVerifyError } = useAuth();

  React.useEffect(() => {
    if (token) {
      attemptToVerifyEmail({ token: token });
    }
  }, [token]);
  return (
    !IsVerifyError ? (
    <Button disabled={VerifyLoading}>
      {VerifyLoading ? (
        <Icons.spinner
          className='mr-2 h-4 w-4 text-green-400 animate-spin'
          aria-hidden='true'
        />
      ) : (
        <Icons.success className='mr-2 h-6 w-6' />
      )}
    </Button>
    ) :(
      <Button disabled={VerifyLoading}>
        <Link href='/signup'>
           <span> Please try to Create new Account</span>
          </Link>
        </Button>
    )
  );
}
