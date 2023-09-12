'use client';
import React from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  UncontrolledFormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Icons } from '../ui/icons';
import { Checkbox } from '../ui/checkbox';
import { IAddress } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addressClient } from '@/services/address.service';
import { useForm } from 'react-hook-form';
import { TUserAddress, UserAddressSchema } from '@/validations/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { API_ENDPOINTS } from '@/utils/api/api-endpoints';

type addressFormProps = {
  initialValues?: IAddress;
};
const AddressEditForm = ({ initialValues }: addressFormProps) => {
  console.log(initialValues);
  const queryClient = useQueryClient();
  const {
    mutateAsync: addressUpdateMutation,
    isLoading: addressUpdateLoading,
    isError: IsAddressUpdateError,
  } = useMutation(addressClient.addressUpdate);

  const addressForm = useForm<TUserAddress>({
    resolver: zodResolver(UserAddressSchema),
    defaultValues: {
      default: initialValues?.default,
      name: initialValues?.name,
      country: initialValues?.country,
      street: initialValues?.street,
      city: initialValues?.city,
      state: initialValues?.state,
      postcode: initialValues?.postcode,
      email: initialValues?.email,
      phone: initialValues?.phone,
    },
  });

  const attemptToUpdateAddress = async (data: TUserAddress) => {
    toast.promise(
      addressUpdateMutation({
        variables: { id: initialValues?._id as string, input: data },
      }),
      {
        loading: 'updating...',
        success: data => {
          queryClient.invalidateQueries([API_ENDPOINTS.ADDRESSES]);
          queryClient.invalidateQueries([API_ENDPOINTS.ME]);

          return <b>{data.message}</b>;
        },
        error: error => {
          const {
            response: { data },
          }: any = error ?? {};

          return <b> {data?.message}</b>;
        },
      }
    );
  };

  return (
    <Form {...addressForm}>
      <form
        className='grid gap-6'
        onSubmit={(...args) =>
          void addressForm.handleSubmit(attemptToUpdateAddress)(...args)
        }
      >
        <FormField
          control={addressForm.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder='Jone' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={addressForm.control}
          name='country'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Input placeholder='Bangladesh' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={addressForm.control}
          name='street'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Street Address</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='House number and street name'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={addressForm.control}
          name='city'
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input placeholder='City' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={addressForm.control}
          name='state'
          render={({ field }) => (
            <FormItem>
              <FormLabel>State</FormLabel>
              <FormControl>
                <Input placeholder='State' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={addressForm.control}
          name='postcode'
          render={({ field }) => (
            <FormItem>
              <FormLabel>PostCode</FormLabel>
              <FormControl>
                <Input placeholder='PostCode' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex flex-col items-start gap-6 sm:flex-row'>
          <FormItem className='w-full'>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                aria-invalid={!!addressForm.formState.errors.state}
                placeholder='example@gmail.com'
                {...addressForm.register('email')}
              />
            </FormControl>
            <UncontrolledFormMessage
              message={addressForm.formState.errors?.state?.message}
            />
          </FormItem>
          <FormItem className='w-full'>
            <FormLabel>Phone Number</FormLabel>
            <FormControl>
              <Input
                aria-invalid={!!addressForm.formState.errors.state}
                placeholder='+88016******'
                {...addressForm.register('phone')}
              />
            </FormControl>
            <UncontrolledFormMessage
              message={addressForm.formState.errors?.state?.message}
            />
          </FormItem>
        </div>

        <FormField
          control={addressForm.control}
          name='default'
          render={({ field }) => (
            <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className='space-y-1 leading-none'>
                <FormLabel>Set as my default address</FormLabel>
              </div>
            </FormItem>
          )}
        />

        <Button disabled={addressUpdateLoading} className=' ' size={'sm'}>
          {addressUpdateLoading && (
            <Icons.spinner
              className='mr-2 h-4 w-4 animate-spin'
              aria-hidden='true'
            />
          )}
          Save
        </Button>
      </form>
    </Form>
  );
};

export default AddressEditForm;
