import useSWR from 'swr';

import {get} from '@/utils/helpers/request.helper';
import { TFolder } from '@/types/type';

const useFolder= (slug:string) => {
    
  const { data, error, isLoading, mutate , isValidating} = useSWR<TFolder>('/api/folder/'+slug, get);

  

  return {
    data,
    error,
    isLoading,
    mutate,
    isValidating
  }
};

export default useFolder;