import ProfileForm from '@/components/forms/ProfileForm';
import { Shell } from '@/components/shells/shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import React from 'react';
// import ProfileEditComponent from './components/ProfileEditComponent';
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from '@/components/common/shared/page-header';

const ProfileEditComponent = dynamic(() => import('./components/ProfileEditComponent'), {
  ssr: false,
});
export const metadata: Metadata = {
  title: 'Profile Edit',
  description: 'Manage your account Information',
};

const ProfileEdit = async() => {
  return (
    <Shell variant={'sidebar'} >
      <PageHeader id='profileEdit-header' aria-labelledby='profileEdit-header-heading'>
        <PageHeaderHeading size='sm'>Profile Edit</PageHeaderHeading>
        <PageHeaderDescription size='sm'>
          Manage your profile Edit settings
        </PageHeaderDescription>
      </PageHeader>
      <section>
      
          <ProfileEditComponent/>
    
      </section>
    </Shell>
  );
};

export default ProfileEdit;
