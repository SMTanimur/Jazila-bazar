import { userClient } from '@/services/user.service';
import { QueryKeys } from '@/utils/queryKey/query';
import { useQuery } from '@tanstack/react-query';

export const useMe =  () => {
  return useQuery(['me'],  userClient.me);
};
