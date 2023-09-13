"use client"

import { Shell } from '@/components/shells/shell';
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/common/shared/page-header';
// import AccountInformation from './components/AccountInformation';
import dynamic from 'next/dynamic'
 
const AccountInformation = dynamic(() => import('./components/AccountInformation'), { ssr: false })
 

export default function AccountPage() {
  
  return (
    <Shell variant='sidebar'>
      <PageHeader id='account-header' aria-labelledby='account-header-heading'>
        <PageHeaderHeading size='sm'>Account</PageHeaderHeading>
        <PageHeaderDescription size='sm'>
          Manage your account settings
        </PageHeaderDescription>
      </PageHeader>
      <section

        className='w-full overflow-hidden'
      >
        <AccountInformation/>
      </section>
    </Shell>
  );
}
