import { useRef } from 'react';

export function useIsFirstMount(): boolean {
  const isFirstMount = useRef(true);

  if (isFirstMount.current) {
    isFirstMount.current = false;

    return true;
  }

  return isFirstMount.current;
}
