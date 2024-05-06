import { renderHook } from '@testing-library/react';

import { useIsFirstMount } from '../src/useIsFirstMount';

describe('useIsFirstRun', () => {
  it('should return the expect value', () => {
    const { rerender, result } = renderHook(() => useIsFirstMount());

    expect(result.current).toBe(true);

    rerender();
    expect(result.current).toBe(false);

    rerender();
    expect(result.current).toBe(false);
  });
});
