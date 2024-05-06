import { DependencyList, EffectCallback, useEffect, useRef } from 'react';
import deepEqual from '@gilbarbara/deep-equal';

import { isPrimitive } from './utils';

export function useDeepCompareEffect<TDeps extends DependencyList>(
  effect: EffectCallback,
  dependencies: TDeps,
) {
  if (process.env.NODE_ENV !== 'production') {
    if (!(dependencies instanceof Array) || !dependencies.length) {
      // eslint-disable-next-line no-console
      console.warn(
        '`useDeepCompareEffect` should not be used with no dependencies. Use React.useEffect instead.',
      );
    }

    if (dependencies.length && dependencies.every(isPrimitive)) {
      // eslint-disable-next-line no-console
      console.warn(
        '`useDeepCompareEffect` should not be used with dependencies that are all primitive values. Use React.useEffect instead.',
      );
    }
  }

  const ref = useRef<TDeps | undefined>(undefined);

  if (!ref.current || !deepEqual(dependencies, ref.current)) {
    ref.current = dependencies;
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, ref.current);
}
