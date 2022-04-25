import { useRef } from 'react';

export default function useSingleton(callback: () => void): void {
  const hasBeenCalled = useRef(false);

  if (hasBeenCalled.current) {
    return;
  }

  callback();
  hasBeenCalled.current = true;
}
