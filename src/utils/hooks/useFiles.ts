import useSWR from 'swr';

import { TDynamic, TFile } from '@/types/type';
import { get } from '@/utils/helpers/request.helper';

const useFiles= (query?:TDynamic<string>) => {
    
  const { data, error, isLoading, mutate , isValidating} = useSWR<TFile[]>('/api/files', (url:string) => get(url,query));

  return {
    data,
    error,
    isLoading,
    mutate,
    isValidating
  }
};

export default useFiles;