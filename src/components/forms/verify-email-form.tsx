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
import { Input } from '@/components/ui/input';

import { Icons } from '../ui/icons';
import { useAuth } from '@/hooks/api/auth/useAuth';



export function VerifyEmailForm() {
  
 const {verifyForm,VerifyLoading,IsVerifyError,attemptToVerifyEmail}=useAuth()
  return (
    <Form {...verifyForm}>
      <form
        className='grid gap-4'
        onSubmit={(...args) => void verifyForm.handleSubmit(attemptToVerifyEmail)(...args)}
      >
        <FormField
          control={verifyForm.control}
          name='token'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Verification Code</FormLabel>
              <FormControl>
                <Input
                  placeholder='169420'
                  {...field}
                  onChange={e => {
                    e.target.value = e.target.value.trim();
                    field.onChange(e);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
    </Form>
  );
}
