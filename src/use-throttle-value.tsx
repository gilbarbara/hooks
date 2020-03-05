import { useEffect, useRef, useState } from 'react';

interface UseThrottleOptions {
  leading?: boolean;
  trailing?: boolean;
}

export default function useThrottleValue<T>(
  value: T,
  ms: number,
  options?: UseThrottleOptions,
): unknown {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const coolDown = useRef(Date.now());
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const leading = options?.leading ?? true;
  const trailing = options?.trailing ?? false;

  useEffect(() => {
    const timerFn = () => {
      timer.current = undefined;

      if (trailing) {
        setThrottledValue(value);
      }
    };

    if (timer.current) {
      timer.current = setTimeout(timerFn, Date.now() - coolDown.current);
    }

    if (!timer.current && value !== throttledValue) {
      /* istanbul ignore else */
      if (leading) {
        setThrottledValue(value);
      }

      timer.current = setTimeout(timerFn, ms);
      coolDown.current = Date.now();
    }

    return () => {
      clearTimeout(timer.current!);
    };
  }, [leading, ms, throttledValue, trailing, value]);

  return throttledValue;
}
