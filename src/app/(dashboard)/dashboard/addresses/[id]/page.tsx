import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/common/shared/page-header';
import { Shell } from '@/components/shells/shell';
import { Metadata } from 'next';
import React from 'react';
import AddressEdit from './AddressEdit';
import dynamic from 'next/dynamic';


type Params = {
  params: {
    id: string;
  };
};
export const metadata: Metadata = {
  title: 'Addresses Information',
  description: 'Manage your Addresses settings',
};
const AddressEditPage = ({ params: { id } }: Params) => {
  return (
    <Shell variant={'sidebar'}>
      <PageHeader id='address edit' aria-labelledby='Address edit'>
        <PageHeaderHeading size='sm'>Address edit</PageHeaderHeading>
        <PageHeaderDescription size='sm'>
          Manage your Address settings
        </PageHeaderDescription>
      </PageHeader>
      <section className=''>
        <AddressEdit addressId={id} />
      </section>
    </Shell>
  );
};

export default AddressEditPage;
