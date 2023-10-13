"use client"
import React from 'react';
import Image from 'next/image';
import { toast } from 'sonner';
import { uploadImage } from '@/services/upload.service';
import { useUser } from '@/hooks/api/user/useUser';
import { TProfile } from '@/validations/auth';
import { CameraIcon } from 'lucide-react';
import { useFileHandler } from '@/hooks/useFileHandler';
import { IImage, IUser } from '@/types';
import { Button } from '@/components/ui/button';
import { useMe } from '@/hooks/api/user/useMe';

const initImageState = { id: '', file: null, url: '' };

const AvatarEditForm = () => {
  const {me}=useMe()

  const { attemptEditProfile, editProfileLoading } = useUser();
  const profilePicture = useFileHandler<IImage>('single', initImageState);
  const onCropSuccessCallback = async () => {
    if (profilePicture.imageFile.file) {
      const formData = new FormData();
      formData.append('files', profilePicture.imageFile.file);
      try {
        toast('Uploading...', { icon: '📤' });
        const { image } = await uploadImage(formData);
        const userData = {
          avatar: image.img_url,
          firstName: me?.firstName,
          lastName: me?.lastName,
          email: me?.email,
          contact: me?.contact,
        };

        await attemptEditProfile(userData as TProfile);
        toast.dismiss();
      } catch (error) {
        toast.error('Failed to update profile picture.');
      }
    }
  };

  return (
    <div className=' w-full flex flex-col gap-4 justify-center items-center'>
      <div className='relative '>
        <Image
          src={profilePicture.imageFile.url || (me?.avatar as string)}
          className='h-32 w-32 cursor-pointer rounded-xl bg-gray-200 ring-8 ring-gray-50 dark:bg-gray-700 dark:ring-black sm:h-52 sm:w-52'
          height={128}
          width={128}
          alt={me?.lastName as string}
          data-testid='profile-avatar'
        />

        <div>
          <input
            type='file'
            hidden
            accept='image/*'
            onChange={profilePicture.onFileChange}
            readOnly={editProfileLoading}
            id='picture'
          />
          <label htmlFor='picture'>
            <div className='flex items-center w-10 h-10 justify-center cursor-pointer p-2 bg-indigo-700 rounded-full absolute bottom-1 laptop:bottom-0 left-0 hover:bg-indigo-800'>
              <CameraIcon className=' h-7 w-7 flex items-center justify-center text-white' />
            </div>
          </label>
        </div>
      </div>
      <Button onClick={onCropSuccessCallback}>Upload</Button>
    </div>
  );
};

export default AvatarEditForm;
