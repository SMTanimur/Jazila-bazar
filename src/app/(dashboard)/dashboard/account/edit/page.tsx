import ProfileForm from '@/components/forms/ProfileForm';
import { Shell } from '@/components/shells/shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';

const ProfileEdit = () => {
  return (
    <Shell variant={'sidebar'} title='Profile Edit'>
      <Card>
        <CardHeader>
          <CardTitle>Profile Edit</CardTitle>
        </CardHeader>
        <CardContent className='flex items-center gap-4 md:w-[50%] w-full'>
          <ProfileForm/>
        </CardContent>
      </Card>
    </Shell>
  );
};

export default ProfileEdit;
