import { Metadata } from 'next';
import React from 'react'

type Params = {
  params: {
    id: string
  };
};
export const metadata: Metadata = {
  title: 'Addresses Information',
  description: 'Manage your Addresses settings',
};
const AddressPage = ({ params: { id } }: Params) => {
  return (
    <div>AddressPage</div>
  )
}

export default AddressPage