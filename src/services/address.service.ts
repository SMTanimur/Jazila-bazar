import { IAddress } from '@/types';
import { PaginatorInfo } from '@/types/utils';
import { HttpClient } from '@/utils/api/http';
import { TUserAddress } from '@/validations/user';

export interface IAddressUpdateVariables {
  variables: {
    id: string;
    input: TUserAddress
  };
}

export const addressClient = {
  addressCreate: (variables: TUserAddress) => {
    return HttpClient.post<{ message: string }>(`/addresses`, variables);
  },

  getCustomerAddresses: () => {
    return HttpClient.get<PaginatorInfo<IAddress>>(`/addresses/customer`);
  },

  addressDelete: (id: string) => {
    return HttpClient.delete<{ message: string }>(`/addresses/${id}`);
  },

  addressUpdate: ({ variables: { id, input } }: IAddressUpdateVariables) => {
    return HttpClient.patch<{ message: string }>(`/addresses/${id}`, input);
  },
  getAddress: (id: string) => {
    return HttpClient.get<IAddress>(`/addresses/${id}`);
  },
};
