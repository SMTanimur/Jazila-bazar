import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/common/shared/page-header';
import AddressFrom from '@/components/forms/AddressFrom';
import { Shell } from '@/components/shells/shell';
import React from 'react';

const NewAddress = () => {
  return (
    <Shell variant={'sidebar'}>
      <PageHeader id='account-header' aria-labelledby='account-header-heading'>
        <PageHeaderHeading size='sm'>New Address</PageHeaderHeading>
        <PageHeaderDescription className='text-sm text-muted-foreground'>
          Add a new address to your account
        </PageHeaderDescription>
        <div className='mt-5 p-3'>
          <AddressFrom />
        </div>
      </PageHeader>
    </Shell>
  );
};

export default NewAddress;
