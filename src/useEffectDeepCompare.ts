import { DependencyList, EffectCallback, useEffect, useRef } from 'react';
import deepEqual from '@gilbarbara/deep-equal';

import { validateDependencies } from './utils';

export function useEffectDeepCompare<TDeps extends DependencyList>(
  effect: EffectCallback,
  dependencies: TDeps,
) {
  validateDependencies(dependencies, 'useEffectDeepCompare', 'useEffect');

  const ref = useRef<TDeps>(dependencies);

  if (!deepEqual(dependencies, ref.current)) {
    ref.current = dependencies;
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, ref.current);
}
