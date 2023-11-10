import { addressClient } from '@/services/address.service';
import { API_ENDPOINTS } from '@/utils/api/api-endpoints';
import { TUserAddress, UserAddressSchema } from '@/validations/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export function useAddress() {
  const {push}=useRouter()
  const queryClient = useQueryClient();
  const {
    mutateAsync: addressMutation,
    isLoading: addressLoading,
    isError: IsAddressError,
  } = useMutation(addressClient.addressCreate);
  const {
    mutateAsync: addressDeleteMutation,
    isLoading: addressDeleteLoading,
    isError: IsAddressDeleteError,
  } = useMutation(addressClient.addressDelete);

  const addressForm = useForm<TUserAddress>({
    resolver: zodResolver(UserAddressSchema),
    defaultValues: {
      email: '',
      city: '',
      country: '',
      default: false,
      name: '',
      phone: '',
      postcode: '',
      state: '',
      street: '',
    },
  });

  const attemptToCreateAddress = async (data: TUserAddress) => {
    toast.promise(addressMutation(data), {
      loading: 'address...',
      success: data => {
        queryClient.invalidateQueries([API_ENDPOINTS.ADDRESSES]);
        queryClient.invalidateQueries([API_ENDPOINTS.ME]);
        push('/dashboard/addresses')
        return <b>{data.message}</b>;
      },
      error: error => {
        const {
          response: { data },
        }: any = error ?? {};

        return <b> {data?.message}</b>;
      },
    });
  };
  const attemptToDeleteAddress = async (data: string) => {
    toast.promise(addressDeleteMutation(data), {
      loading: 'Deleting...',
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
    });
  };

  return {
    attemptToCreateAddress,
    addressForm,
    addressLoading,
    IsAddressError,
    attemptToDeleteAddress,
    addressDeleteLoading,
    IsAddressDeleteError,
    
  };
}
