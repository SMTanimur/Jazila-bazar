'use client';
import { Shell } from '@/components/shells/shell';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { useMe } from '@/hooks/api/user/useMe';
import { AvatarImage } from '@radix-ui/react-avatar';
import React from 'react';

const AccountInformation = () => {
  const { me } = useMe();
  return (
    <div className='flex md:flex-row flex-col md:space-x-4 space-y-4'>
      <Card className=' p-6'>
        <CardContent className='flex flex-col gap-2'>
          <div className='flex flex-col justify-center items-center gap-3'>
            <Avatar className='w-[100px] h-[100px]'>
              <AvatarImage src={me?.avatar} alt={me?.lastName} />
              {/* <AvatarFallback>{me?.lastName}</AvatarFallback> */}
            </Avatar>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountInformation;
