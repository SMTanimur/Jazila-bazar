'use client';

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/common/shared/page-header';
import { Shell } from '@/components/shells/shell';
import React from 'react';
import { useMe } from '@/hooks/api/user/useMe';
import loading from './loading';
import ChangePasswordForm from '@/components/forms/ChangePasswordForm';

const ChangePassword = () => {
  const { me, isLoading,isAuthorized } = useMe();

  if (  isLoading) {
    return loading();
  }
  if ( isAuthorized &&  me?.provider !== 'password') {
    return (
      <div className='flex h-[40vh] justify-center items-center'>
        <span>No Need change Your Password</span>
      </div>
    );
  }
  return (
    <Shell variant={'sidebar'}>
      <PageHeader
        id='change-password-header'
        aria-labelledby='change-password-header-heading'
      >
        <PageHeaderHeading size='sm'>Change Password</PageHeaderHeading>
        <PageHeaderDescription size='sm'>
          Change your Password
        </PageHeaderDescription>
      </PageHeader>
      <section>
        <ChangePasswordForm />
      </section>
    </Shell>
  );
};

export default ChangePassword;
