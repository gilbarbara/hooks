import { useMemo, useRef, useState } from 'react';

import { Target } from './types';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';
import { canUseDOM, getElement } from './utils';

export function useResizeObserver<T extends Element>(target: Target<T>, debounce: number = 0) {
  const [value, setValue] = useState<ResizeObserverEntry>();
  const timeoutRef = useRef<number | null>(null);

  const isFirstCall = useRef(true);

  const observer = useMemo(() => {
    if (!canUseDOM) {
      return {};
    }

    return new window.ResizeObserver(entries => {
      if (debounce && !isFirstCall.current) {
        if (timeoutRef.current) {
          window.clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = window.setTimeout(() => {
          setValue(entries[0]);
        }, debounce);

        return;
      }

      setValue(entries[0]);
      isFirstCall.current = false;
    });
  }, [debounce]);

  useIsomorphicLayoutEffect(() => {
    if (!canUseDOM || !(observer instanceof ResizeObserver)) {
      return () => undefined;
    }

    const element = getElement(target);

    if (!element) {
      return () => undefined;
    }

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [observer, target]);

  return value;
}
