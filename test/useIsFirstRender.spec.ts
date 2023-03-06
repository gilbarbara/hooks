import { renderHook } from '@testing-library/react';

import { useIsFirstRender } from '../src/useIsFirstRender';

describe('useIsFirstRender', () => {
  it('should return the expect value', () => {
    const { rerender, result } = renderHook(() => useIsFirstRender());

    expect(result.current).toBe(true);

    rerender();
    expect(result.current).toBe(false);

    rerender();
    expect(result.current).toBe(false);
  });
});
