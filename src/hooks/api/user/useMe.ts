import { userClient } from '@/services/user.service';
import { API_ENDPOINTS } from '@/utils/api/api-endpoints';
import { authorizationAtom } from '@/utils/authorization-atom';
import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';


export function useMe() {
  const [isAuthorized] = useAtom(authorizationAtom);


  const { data, isLoading, error } = useQuery(
    [API_ENDPOINTS.ME],
    userClient.me,
    {
      enabled: isAuthorized,
      retry: false,
    }
  );
  //TODO: do some improvement here
  return { me: data, isLoading, error, isAuthorized };
}
