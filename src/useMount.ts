import { useEffectOnce } from './useEffectOnce';

export function useMount(fn: () => void) {
  useEffectOnce(() => {
    fn();
  });
}
