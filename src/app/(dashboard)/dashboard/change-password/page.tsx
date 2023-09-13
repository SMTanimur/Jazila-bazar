import { PageHeader, PageHeaderDescription, PageHeaderHeading } from '@/components/common/shared/page-header'

import { Shell } from '@/components/shells/shell'
import React from 'react'
import ChangePasswordComponent from './ChangePasswrodComponent'

const ChangePassword = () => {
  return (
    <Shell variant={'sidebar'}>
      <PageHeader id='change-password-header' aria-labelledby='change-password-header-heading'>
      <PageHeaderHeading size='sm'>Change Password</PageHeaderHeading>
        <PageHeaderDescription size='sm'>
          Change your Password
        </PageHeaderDescription>
      </PageHeader>
       <section>
        <ChangePasswordComponent/>
       </section>
    </Shell>
  )
}

export default ChangePassword