import { useEffect, useRef, useState, MutableRefObject } from 'react';

interface UseThrottleOptions {
  leading?: boolean;
  trailing?: boolean;
}

export default function useThrottle(
  value: unknown,
  ms: number,
  options?: UseThrottleOptions,
): unknown {
  const [throttledValue, setThrottledValue] = useState(value);
  const coolDown = useRef(Date.now());
  const timeout: MutableRefObject<null | number> = useRef(null);
  const wait = useRef(false);

  const leading = options?.leading ?? true;
  const trailing = options?.trailing ?? false;

  useEffect(() => {
    if (wait.current) {
      timeout.current = window.setTimeout(() => {
        wait.current = false;

        if (trailing) {
          setThrottledValue(value);
        }
      }, Date.now() - coolDown.current);
    }

    if (!wait.current && value !== throttledValue) {
      if (leading) {
        setThrottledValue(value);
      }
      wait.current = true;
      coolDown.current = Date.now();
    }

    return () => {
      clearTimeout(timeout.current!);
    };
  }, [leading, ms, throttledValue, trailing, value]);

  return throttledValue;
}
