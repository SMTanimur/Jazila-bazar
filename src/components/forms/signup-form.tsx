'use client';

import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '../ui/password-input';
import { Icons } from '../ui/icons';
import { useAuth } from '@/hooks/api/auth/useAuth';

export function SignUpForm() {
  const { registerForm, SignupLoading, IsSignupError, attemptToRegister } =
    useAuth();

  return (
    <Form {...registerForm}>
      <form
        className='grid gap-4'
        onSubmit={(...args) =>
          void registerForm.handleSubmit(attemptToRegister)(...args)
        }
      >
        <FormField
          control={registerForm.control}
          name='firstName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>FirstName</FormLabel>
              <FormControl>
                <Input placeholder='Jone' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={registerForm.control}
          name='lastName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>LastName</FormLabel>
              <FormControl>
                <Input placeholder='Due' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={registerForm.control}
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
          control={registerForm.control}
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
        <FormField
          control={registerForm.control}
          name='passwordConfirm'
          render={({ field }) => (
            <FormItem>
              <FormLabel>PasswordConfirm</FormLabel>
              <FormControl>
                <PasswordInput placeholder='**********' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={SignupLoading}>
          {SignupLoading && (
            <Icons.spinner
              className='mr-2 h-4 w-4 animate-spin'
              aria-hidden='true'
            />
          )}
          Continue
          <span className='sr-only'>Continue to email verification page</span>
        </Button>
      </form>
    </Form>
  );
}
