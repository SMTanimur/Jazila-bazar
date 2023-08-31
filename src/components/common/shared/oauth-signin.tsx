'use client';

import * as React from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import Link from 'next/link';
import { useAuth } from '@/hooks/api/auth/useAuth';
import { GoogleApiRedirect } from '@/configs/settings';

export function OAuthSignIn() {
  const isLoading = false;
  const { LoginLoading } = useAuth();

  const onClickSocialLogin = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (LoginLoading) e.preventDefault();
  };
  return (
    <div className='grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-4'>
    
        <Button
          aria-label={`Sign in with  Google`}
          key={'google'}
          disabled
          variant='outline'
          className='w-full bg-blue-500 sm:w-auto text-slate-50'
        >
          <Icons.facebook className='mr-2 h-4 w-4' aria-hidden='true' />
          Facebook
        </Button>
    
      <Link href={GoogleApiRedirect} onClick={onClickSocialLogin}>
        <Button
          aria-label={`Sign in with  Google`}
          key={'google'}
          variant='outline'
          className='w-full bg-slate-100 text-gray-800 sm:w-auto'
        >
          <Icons.google className='mr-2 h-4 w-4' aria-hidden='true' />
          Google
        </Button>
      </Link>
    
        <Button
          aria-label={`Sign in with  Google`}
          key={'google'}
          disabled
          variant='outline'
          className='w-full bg-gray-700 sm:w-auto text-stone-100'
        >
          <Icons.gitHub className='mr-2 h-4 w-4' aria-hidden='true' />
          GitHub
        </Button>
    </div>
  );
}
