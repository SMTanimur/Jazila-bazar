
import { Shell } from '@/components/shells/shell';
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/common/shared/page-header';
import AccountInformation from './components/AccountInformation';
import ClientOnly from '@/components/common/shared/ClientOnly';

 
export default async function AccountPage() {
  
  return (
    <Shell variant='sidebar'>
      <PageHeader id='account-header' aria-labelledby='account-header-heading'>
        <PageHeaderHeading size='sm'>Account</PageHeaderHeading>
        <PageHeaderDescription size='sm'>
          Manage your account settings
        </PageHeaderDescription>
      </PageHeader>
      <ClientOnly>
      <section

        className='w-full overflow-hidden'
      >

        <AccountInformation/>
      </section>
      </ClientOnly>
    </Shell>
  );
}
