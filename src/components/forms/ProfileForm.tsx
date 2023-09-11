'use client';
import React from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { useUser } from '@/hooks/api/user/useUser';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Icons } from '../ui/icons';

const ProfileForm = () => {

  const {
    IsEditProfileError,
    attemptEditProfile,
    editProfileLoading,
    profileEditForm,
  } = useUser();
  return (
    <Form {...profileEditForm}>
      <form
        className='grid gap-4 w-full'
        onSubmit={(...args) =>
          void profileEditForm.handleSubmit(attemptEditProfile)(...args)
        }
      >
        <FormField
          control={profileEditForm.control}
          name='firstName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>FirstName</FormLabel>
              <FormControl>
                <Input
                  placeholder='Jone'
                  {...field}
                
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={profileEditForm.control}
          name='lastName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>LastName</FormLabel>
              <FormControl>
                <Input
                  placeholder='Due'
                  {...field}
               
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={profileEditForm.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder='example@gmail.com'
                  {...field}
                
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={profileEditForm.control}
          name='contact'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact</FormLabel>
              <FormControl>
                <Input {...field}  />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={editProfileLoading}>
          {editProfileLoading && (
            <Icons.spinner
              className='mr-2 h-4 w-4 animate-spin'
              aria-hidden='true'
            />
          )}
          Update
        </Button>
      </form>
    </Form>
  );
};

export default ProfileForm;
