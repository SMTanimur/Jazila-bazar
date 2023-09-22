'use client';
import { userClient } from '@/services/user.service';
import { IUser } from '@/types';
import { TProfile, profileSchema } from '@/validations/auth';
import { zodResolver } from '@hookform/resolvers/zod';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useMe } from './useMe';

export function useUser() {
  const { me: user } = useMe();
 
  const queryClient = useQueryClient();
  const {
    mutateAsync: editProfileMutation,
    isLoading: editProfileLoading,
    isError: IsEditProfileError,
  } = useMutation(userClient.updateUser);

  const profileEditForm = useForm<TProfile>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      avatar: user?.avatar,
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      contact: user?.contact,
    },
  });

  const attemptEditProfile = async (data: TProfile) => {
    toast.promise(editProfileMutation(data), {
      loading: 'updating...',
      success: data => {
        queryClient.invalidateQueries(['me']);
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

  return {
    profileEditForm,
    attemptEditProfile,
    editProfileLoading,
    IsEditProfileError,
  };
}
