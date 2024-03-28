import useSWR from 'swr';

import {get} from '@/utils/helpers/request.helper';

const useCurrentUser = () => {
    
  const { data, error, isLoading, mutate } = useSWR('/api/user', get);

  return {
    data,
    error,
    isLoading,
    mutate
  }
};

export default useCurrentUser;