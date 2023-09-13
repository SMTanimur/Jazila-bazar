"use client"

import { PageHeader, PageHeaderDescription, PageHeaderHeading } from '@/components/common/shared/page-header'

import { Shell } from '@/components/shells/shell'
import React from 'react'
import ChangePasswordComponent from './ChangePasswrodComponent'
import { useMe } from '@/hooks/api/user/useMe'
import { IUser } from '@/types'
import loading from './loading'

const ChangePassword = () => {
  const {me,isLoading}=useMe()
  if(isLoading){
    return loading()
  }
  return (
    <Shell variant={'sidebar'}>
      <PageHeader id='change-password-header' aria-labelledby='change-password-header-heading'>
      <PageHeaderHeading size='sm'>Change Password</PageHeaderHeading>
        <PageHeaderDescription size='sm'>
          Change your Password
        </PageHeaderDescription>
      </PageHeader>
       <section>
        <ChangePasswordComponent user={me as IUser}/>
       </section>
    </Shell>
  )
}

export default ChangePassword