import useSWR from 'swr';

import { TNote } from '@/types/type';
import { get } from '@/utils/helpers/request.helper';

const useNotes= (query?:any) => {
    
  const { data, error, isLoading, mutate , isValidating} = useSWR<TNote[]>('/api/note', (url:string) => get(url,query));

  return {
    data,
    error,
    isLoading,
    mutate,
    isValidating
  }
};

export default useNotes;