import { renderHook } from '@testing-library/react';

import { useIsFirstRun } from '../src/useIsFirstRun';

describe('useIsFirstRun', () => {
  it('should return the expect value', () => {
    const { rerender, result } = renderHook(() => useIsFirstRun());

    expect(result.current).toBe(true);

    rerender();
    expect(result.current).toBe(false);

    rerender();
    expect(result.current).toBe(false);
  });
});
