"use client"
import React from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { useAuth } from '@/hooks/api/auth/useAuth'
import { PasswordInput } from '../ui/password-input'
import { Button } from '../ui/button'
import { Icons } from '../ui/icons'

const ChangePasswordForm = () => {
  const {changePasswordForm,changePasswordLoading,attemptToChangePassword}=useAuth()
  return (
    <Form {...changePasswordForm}>
      <form
        className='grid gap-4'
        onSubmit={(...args) =>
          void changePasswordForm.handleSubmit(attemptToChangePassword)(...args)
        }
      >
        <FormField
          control={changePasswordForm.control}
          name='oldPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Old-Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder='**********' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={changePasswordForm.control}
          name='newPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder='**********' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={changePasswordForm.control}
          name='newPasswordConfirm'
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password Confirm</FormLabel>
              <FormControl>
                <PasswordInput placeholder='**********' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={changePasswordLoading}>
          {changePasswordLoading && (
            <Icons.spinner
              className='mr-2 h-4 w-4 animate-spin'
              aria-hidden='true'
            />
          )}
          Sign in
          <span className='sr-only'>Change password</span>
        </Button>
      </form>
    </Form>
  )
}

export default ChangePasswordForm