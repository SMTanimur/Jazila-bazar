import { addressClient } from '@/services/address.service';
import { API_ENDPOINTS } from '@/utils/api/api-endpoints';
import { TUserAddress, UserAddressSchema } from '@/validations/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export function useAddress() {
  const queryClient = useQueryClient();
  const {
    mutateAsync: addressMutation,
    isLoading: addressLoading,
    isError: IsAddressError,
  } = useMutation(addressClient.addressCreate);

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
        addressForm.reset();
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
  };
}
