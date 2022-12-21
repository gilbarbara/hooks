import { useEffect, useRef } from 'react';

type Callback = (width: number) => void;

interface UseResizeOptions {
  callback?: Callback;
  debounce?: number;
}

export function useResize(callbackOrOptions: Callback | UseResizeOptions) {
  const callbackRef = useRef<Callback>();
  const debounceRef = useRef<number>(200);
  const timeoutRef = useRef<number>(0);

  if (typeof callbackOrOptions === 'function') {
    callbackRef.current = callbackOrOptions;
  } else {
    const { callback, debounce } = callbackOrOptions || {};

    callbackRef.current = callback;

    if (debounce) {
      debounceRef.current = debounce;
    }
  }

  const getSizeRef = useRef(() => {
    window.clearTimeout(timeoutRef.current);

    timeoutRef.current = window.setTimeout(() => {
      callbackRef.current?.(window.innerWidth);
    }, debounceRef.current);
  });

  useEffect(() => {
    const getSize = getSizeRef.current;

    callbackRef.current?.(window.innerWidth);
    window.addEventListener('resize', getSize);

    return () => window.removeEventListener('resize', getSize);
  }, []);
}
