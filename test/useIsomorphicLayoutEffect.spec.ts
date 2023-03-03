import { useIsomorphicLayoutEffect } from '../src/useIsomorphicLayoutEffect';

describe('useIsomorphicLayoutEffect', () => {
  it('should return useLayoutEffect', () => {
    expect(useIsomorphicLayoutEffect.name).toBe('useLayoutEffect');
  });
});
