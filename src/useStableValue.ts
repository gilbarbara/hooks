import { useState } from 'react';

import { useDeepCompareEffect } from './useDeepCompareEffect';
import { useIsFirstMount } from './useIsFirstMount';

export function useStableValue<T = any>(value: T) {
  const [stableValue, setStableValue] = useState(() => value);
  const isFirstMount = useIsFirstMount();

  useDeepCompareEffect(() => {
    if (isFirstMount) {
      return;
    }

    setStableValue(() => value);
  }, [value]);

  return stableValue;
}
