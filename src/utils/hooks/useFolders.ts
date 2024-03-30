import useSWR from 'swr';

import { TFolder } from '@/types/type';
import { get } from '@/utils/helpers/request.helper';

const useFolders= (query?:any) => {
    
  const { data, error, isLoading, mutate , isValidating} = useSWR<TFolder[]>('/api/folders', (url:string) => get(url,query));

  return {
    data,
    error,
    isLoading,
    mutate,
    isValidating
  }
};

export default useFolders;