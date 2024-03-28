import useSWR from 'swr';

import {get} from '@/utils/helpers/request.helper';

const useFolder= (slug:string) => {
    
  const { data, error, isLoading, mutate , isValidating} = useSWR('/api/folders/'+slug, get);

  

  return {
    data,
    error,
    isLoading,
    mutate,
    isValidating
  }
};

export default useFolder;