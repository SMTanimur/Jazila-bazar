

import { userClient } from "@/services/user"
import { QueryKeys } from "@/utils/queryKey/query"
import { useQuery } from "@tanstack/react-query"


export const useMe = ()=>{
  return useQuery(['me'],userClient.me)
}