'use client';
import { useMe } from '@/hooks/api/user/useMe';
import React from 'react';
import AccountEditLoading from '../loading';
import ProfileForm from '@/components/forms/ProfileForm';

import { IUser } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import dynamic from 'next/dynamic';
const AvatarEditForm = dynamic(() => import('./AvatarEditForm'), {
  ssr: false,
});
const ProfileEditComponent = () => {
  const { isLoading, me } = useMe();
  if (isLoading) {
    return AccountEditLoading();
  }
  return (
    <React.Fragment>
      <Card>
        <CardContent className='flex flex-col md:flex-row items-center gap-4  w-full'>
      <ProfileForm />
      <AvatarEditForm />
      </CardContent>
      </Card>
    </React.Fragment>
  );
};

export default ProfileEditComponent;
