import { addressClient } from '@/services/address.service';
import { IAddress } from '@/types';
import { API_ENDPOINTS } from '@/utils/api/api-endpoints';
import { useQuery } from '@tanstack/react-query';

export function useGetAddresses() {
  const { data, isLoading, error } = useQuery(
    [API_ENDPOINTS.ADDRESSES],
    addressClient.getCustomerAddresses
  );
  //TODO: do some improvement here
  return { data, isLoading, error };
}

export function useGetAddress (id: string) {
  const { data, isLoading, error } = useQuery(
    [API_ENDPOINTS.ADDRESSES, id],
    () => addressClient.getAddress(id)
  );

  return { data, isLoading, error };
}
