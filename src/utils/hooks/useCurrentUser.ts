import useSWR from 'swr';

import {get} from '@/utils/helpers/request.helper';
import { TUser } from '@/types/type';

const useCurrentUser = () => {
    
  const { data, error, isLoading, mutate } = useSWR<TUser>('/api/user', get);

  return {
    data,
    error,
    isLoading,
    mutate
  }
};

export default useCurrentUser;