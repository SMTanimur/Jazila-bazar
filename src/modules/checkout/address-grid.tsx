"use client"
import { useGlobalModalStateStore } from '@/store/modal';
import { IAddress } from '@/types';
import { RadioGroup } from '@headlessui/react';
import { useAtom, WritableAtom } from 'jotai';
import { useEffect } from 'react';
import { AddressHeader } from './address-header';
import { useCheckoutStore } from '@/store/checkout';
import AddressCard from './address-card';


interface AddressesProps {
  addresses: IAddress[] | undefined | null;
  label: string;
  className?: string;
  userId: string;
  count: number;
  type: string;
}

export const AddressGrid: React.FC<AddressesProps> = ({
  addresses,
  label,
  className,
  userId,
  count,
  type,
}) => {
 
  const {setAddressData,setEditAddressData,setDeleteAddressData}=useGlobalModalStateStore(state => state)
  const {setAddress,address}=useCheckoutStore(state => state)
  useEffect(() => {
    if (addresses?.length) {
      if (address?._id) {
        const index = addresses.findIndex((a) => a._id === address._id);
        setAddress(addresses[index]);
      } else {
        setAddress(addresses?.[0]);
      }
    }
  }, [addresses, addresses?.length, address?._id, setAddress]);

  function onAdd() {
    setAddressData(true,userId)
  
  }
  function onEdit(address: any) {
    setEditAddressData(true,{customerId: userId, address})

  }
  function onDelete(address: any) {
    setDeleteAddressData(true,{customerId: userId, addressId: address?.id})
  }

  return (
    <div className={className}>
      <AddressHeader onAdd={onAdd} count={count} label={label} />
      {!addresses?.length ? (
        <div className="grid grid-cols-1 gap-4">
          <span className="relative rounded border border-border-200 bg-gray-100 px-5 py-6 text-center text-base">
           No Address
          </span>
        </div>
      ) : (
        <RadioGroup value={address} onChange={setAddress}>
          <RadioGroup.Label className="sr-only">{label}</RadioGroup.Label>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {addresses?.map((address) => (
              <RadioGroup.Option value={address} key={address?._id}>
                {({ checked }: { checked: boolean }) => (
                  <AddressCard
                    checked={checked}
                    onDelete={() => onDelete(address)}
                    onEdit={() => onEdit(address)}
                    address={address}
                  />
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      )}
    </div>
  );
};
export default AddressGrid;
