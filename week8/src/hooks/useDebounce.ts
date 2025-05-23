import { useState, useEffect } from 'react';

function useDebouncd<T>(value: T, delay: number) {
  const[debouncedValue, setDebouncedValue] = useState<T>(value);
    // value나 delay가 변경될 때마다 setTimeout이 실행됨
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // cleanup function
    return () => {
      clearTimeout(handler);
    };
  }
  , [value, delay]);
  return debouncedValue;
}

export default useDebouncd;