import { useEffect, useRef } from 'react';

import { useLatest } from './useLatest';
import { off, on } from './utils';

export function useClickOutside<T extends Element = HTMLElement>(callback: () => void) {
  const ref = useRef<T>(null);
  const latestCallback = useLatest(callback);

  useEffect(() => {
    const handleClick = (event: MouseEvent | TouchEvent) => {
      if (!ref.current?.contains(event.target as Node)) {
        latestCallback.current();
      }
    };

    on(document, 'click', handleClick);

    return () => {
      off(document, 'click', handleClick);
    };
  }, [latestCallback]);

  return ref;
}
