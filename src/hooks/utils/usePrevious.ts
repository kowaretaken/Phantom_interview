import { useRef, useEffect } from 'react';
export const usePrevious = <T>(value: T): T | null => {
  const ref: React.MutableRefObject<T | null> = useRef(null);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};
