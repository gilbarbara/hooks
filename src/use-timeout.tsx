import { useCallback, useEffect, useRef, MutableRefObject } from 'react';

type Callback = () => void;

export default function useTimeout(callback: Callback, ms = 1000) {
  const savedCallback: MutableRefObject<null | Callback> = useRef(null);
  const timeout: MutableRefObject<null | number> = useRef(null);

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the timeout.
  useEffect(() => {
    timeout.current = window.setTimeout(() => {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }, ms);

    return () => {
      clearTimeout(timeout.current!);
    };
  }, [ms]);

  return useCallback(() => {
    clearTimeout(timeout.current!);
  }, []);
}
