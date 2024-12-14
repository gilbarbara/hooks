import { useEffectOnce } from './useEffectOnce';

export function useMount(callback: () => void) {
  useEffectOnce(callback);
}
