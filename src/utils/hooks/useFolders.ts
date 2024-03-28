import useSWR from 'swr';

import {get} from '@/utils/helpers/request.helper';

const useFolders= (query?:any) => {
    
  const { data, error, isLoading, mutate , isValidating} = useSWR('/api/folders', url => get(url,query));

  return {
    data,
    error,
    isLoading,
    mutate
  }
};

export default useFolders;