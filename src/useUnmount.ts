import { useEffectOnce } from './useEffectOnce';
import { useLatest } from './useLatest';

export function useUnmount(fn: () => any) {
  const unmountFn = useLatest(fn);

  useEffectOnce(() => () => unmountFn.current());
}
