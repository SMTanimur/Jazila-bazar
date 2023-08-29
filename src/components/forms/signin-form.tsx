'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '../ui/input';
import { PasswordInput } from '../ui/password-input';
import { Icons } from '../ui/icons';
import { useAuth } from '@/hooks/api/auth/useAuth';

export function SignInForm() {
  const router = useRouter();

  const { loginForm, IsLoginError, LoginLoading, attemptToLogin } = useAuth();

  return (
    <Form {...loginForm}>
      <form
        className='grid gap-4'
        onSubmit={(...args) =>
          void loginForm.handleSubmit(attemptToLogin)(...args)
        }
      >
        <FormField
          control={loginForm.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='example@gmail.com' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={loginForm.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder='**********' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={LoginLoading}>
          {LoginLoading && (
            <Icons.spinner
              className='mr-2 h-4 w-4 animate-spin'
              aria-hidden='true'
            />
          )}
          Sign in
          <span className='sr-only'>Sign in</span>
        </Button>
      </form>
    </Form>
  );
}
