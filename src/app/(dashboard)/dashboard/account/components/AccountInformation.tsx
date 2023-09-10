'use client';
import { Shell } from '@/components/shells/shell';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useMe } from '@/hooks/api/user/useMe';
import { IAddress } from '@/types';
import { AvatarImage } from '@radix-ui/react-avatar';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const AccountInformation = () => {
  const [address, setAddress] = useState<IAddress | null | undefined>(null);
  const { me } = useMe();

  useEffect(() => {
    if (me) {
      if (me?.addresses) {
        setAddress(me?.addresses?.find(x => x.default));
      }
    } else {
      setAddress(null);
    }
  }, [me]);
  return (
    <div className='flex md:flex-row flex-col items-center md:space-x-4 space-y-4'>
      <Card className=' p-6 w-full'>
        <CardContent className='flex flex-col gap-2'>
          <div className='flex flex-col justify-center items-center gap-3'>
            <Avatar className='w-[100px] h-[100px]'>
              <AvatarImage src={me?.avatar} alt={me?.lastName} />
              <AvatarFallback>{me?.lastName}</AvatarFallback>
            </Avatar>
            <div className='flex flex-col items-center gap-1'>
              <p className='text-2xl font-semibold leading-none tracking-tight'>
                {me?.firstName} {me?.lastName}
              </p>
              <h6 className='text-sm text-muted-foreground'>{me?.email}</h6>
            </div>

            <Button variant={'secondary'}>
              <Link href={'/dashboard/account/edit'}>Edit Profile</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card className='  w-full'>
        <CardHeader>
          <h6 className='text-xl  font-semibold text-muted-foreground'>
            Address
          </h6>
        </CardHeader>
        <CardContent className='flex flex-col gap-2'>
          <div>
            <p className='text-sm text-muted-foreground'>Address</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountInformation;
