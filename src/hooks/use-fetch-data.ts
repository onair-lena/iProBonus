import { useCallback, useState } from 'react';

export function useFetchData<T, P>(asyncFn: (payload: P) => Promise<T>) {
  const [data, setData] = useState<T | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const getData = useCallback(
    async (payload: P) => {
      try {
        setIsLoading(true);
        const result = await asyncFn(payload);

        setData(result);
        return result;
      } catch (err) {
        alert('Oops... something went wrong!');
      } finally {
        setIsLoading(false);
      }
    },
    [asyncFn]
  );

  return {
    data,
    getData,
    isLoading,
  };
}
