import { useEffect, useRef } from 'react';

import { useStableValue } from './useStableValue';
import { off, on } from './utils';

export function useClickOutside<T extends Element = HTMLElement>(callback: () => void) {
  const ref = useRef<T>(null);
  const stableCallback = useStableValue(callback);

  useEffect(() => {
    const handleClick = (event: MouseEvent | TouchEvent) => {
      if (!ref.current?.contains(event.target as Node)) {
        callback();
      }
    };

    on(document, 'click', handleClick);

    return () => {
      off(document, 'click', handleClick);
    };
  }, [stableCallback]);

  return ref;
}
