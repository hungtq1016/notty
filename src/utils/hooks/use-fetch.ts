import useSWR from 'swr';

import {get} from '@/utils/helpers/request.helper';
import { TQuery } from '@/types/type';

const useFetch = <TResponse>(key:string,query?:TQuery) => {
    
  const { data, error, isLoading, mutate , isValidating} = useSWR<TResponse>(key, (url:string)=>get(url,query));

  return {
    data,
    error,
    isLoading,
    mutate,
    isValidating
  }
};

export default useFetch;