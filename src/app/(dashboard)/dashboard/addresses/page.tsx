import { PageHeader, PageHeaderDescription, PageHeaderHeading } from '@/components/common/shared/page-header';
import { Shell } from '@/components/shells/shell';
import { Metadata } from 'next';
import React from 'react'
import AddressesInformation from './components/AddressesInformation';



export const metadata: Metadata = {
  title: 'Addresses Information',
  description: 'Manage your Addresses settings',
};
const AddressPage = () => {

  return (
    <Shell variant={'sidebar'}>
      <PageHeader id='addresses-header' aria-labelledby='Addresses-header-heading'>
        <PageHeaderHeading size='sm'>Addresses</PageHeaderHeading>
        <PageHeaderDescription size='sm'>
          Manage your Addresses settings
        </PageHeaderDescription>
      </PageHeader>

      <section className=''>
        <AddressesInformation/>
      </section>
    </Shell>
  )
}

export default AddressPage