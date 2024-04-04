import useSWR from 'swr';

import {get} from '@/utils/helpers/request.helper';
import { TFile } from '@/types/type';

const useFile = (slug:string) => {
    
  const { data, error, isLoading, mutate , isValidating} = useSWR<TFile>('/api/file/'+slug, get);

  return {
    data,
    error,
    isLoading,
    mutate,
    isValidating
  }
};

export default useFile;