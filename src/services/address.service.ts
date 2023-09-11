import { HttpClient } from "@/utils/api/http";
import { TUserAddress } from "@/validations/user";


export const addressClient = {
  
  addressCreate: (variables: TUserAddress) => {
    return HttpClient.post<{message:string}>(
      `/addresses`,
      variables
    );
  },
  
};
