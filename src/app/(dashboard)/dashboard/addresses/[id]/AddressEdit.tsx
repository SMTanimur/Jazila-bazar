'use client';
import AddressEditForm from '@/components/forms/AddressEditForm';
import { useGetAddress } from '@/hooks/api/addresses/useGetAddresses';
import React from 'react';

type addressEditProps = {
  addressId: string;
};
const AddressEdit = ({ addressId }: addressEditProps) => {
  const { data, error, isLoading } = useGetAddress(addressId);
  return (
    <div className="p-4">
      <AddressEditForm initialValues={data} />
    </div>
  );
};

export default AddressEdit;
