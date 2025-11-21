import { useState, useCallback } from 'react';

// 2. TypeScript: Use generics in a utility function
// T is the generic type for the state value
export const useGenericState = <T>(initialValue: T) => {
  const [value, setValue] = useState<T>(initialValue);

  const setGenericValue = useCallback((newValueOrFn: T | ((prevValue: T) => T)) => {
    setValue(newValueOrFn);
  }, []);

  return [value, setGenericValue] as const;
};