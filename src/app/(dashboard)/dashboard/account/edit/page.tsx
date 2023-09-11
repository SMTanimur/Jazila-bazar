import ProfileForm from '@/components/forms/ProfileForm';
import { Shell } from '@/components/shells/shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import React from 'react';

const AvatarEditForm = dynamic(() => import('./AvatarEditForm'), {
  ssr: false,
});
export const metadata: Metadata = {
  title: 'Profile Edit',
  description: 'Manage your account Information',
};

const ProfileEdit = () => {
  return (
    <Shell variant={'sidebar'} title='Profile Edit'>
      <Card>
        <CardHeader>
          <CardTitle>Profile Edit</CardTitle>
        </CardHeader>
        <CardContent className='flex flex-col md:flex-row items-center gap-4  w-full'>
          <ProfileForm />
          <AvatarEditForm />
        </CardContent>
      </Card>
    </Shell>
  );
};

export default ProfileEdit;
