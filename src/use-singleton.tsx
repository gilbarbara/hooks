import { useRef } from 'react';

export default function useSingleton(cb: () => void): void {
  const hasBeenCalled = useRef(false);

  if (hasBeenCalled.current) {
    return;
  }

  cb();
  hasBeenCalled.current = true;
}
