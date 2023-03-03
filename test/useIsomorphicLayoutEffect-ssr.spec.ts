/**
 * @jest-environment node
 */

import { useIsomorphicLayoutEffect } from '../src/useIsomorphicLayoutEffect';

describe('useIsomorphicLayoutEffect', () => {
  it('should return useEffect', () => {
    expect(useIsomorphicLayoutEffect.name).toBe('useEffect');
  });
});
