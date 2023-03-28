import { useRef } from 'react';

export function useIsFirstRun(): boolean {
  const isFirstRun = useRef(true);

  if (isFirstRun.current) {
    isFirstRun.current = false;

    return true;
  }

  return isFirstRun.current;
}
