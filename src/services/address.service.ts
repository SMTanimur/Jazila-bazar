import { IAddress } from '@/types';
import { PaginatorInfo } from '@/types/utils';
import { HttpClient } from '@/utils/api/http';
import { TUserAddress } from '@/validations/user';

export const addressClient = {
  addressCreate: (variables: TUserAddress) => {
    return HttpClient.post<{ message: string }>(`/addresses`, variables);
  },

  getCustomerAddresses: () => {
    return HttpClient.get<PaginatorInfo<IAddress> >(
      `/addresses/customer`
    );
  },

  addressDelete :(id:string) =>{
    return HttpClient.delete<{ message: string }>(`/addresses/${id}`);
  }
};
