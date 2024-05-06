import { renderHook } from '@testing-library/react';

import { useUpdateEffect } from '../src/useUpdateEffect';

describe('useUpdateEffect', () => {
  it('should run effect on update', () => {
    const effect = vi.fn();

    const { rerender } = renderHook(() => useUpdateEffect(effect));

    expect(effect).not.toHaveBeenCalled();

    rerender();
    expect(effect).toHaveBeenCalledTimes(1);
  });

  it('should run cleanup on unmount', () => {
    const cleanup = vi.fn();
    const effect = vi.fn().mockReturnValue(cleanup);
    const { rerender, unmount } = renderHook((deps: Array<any> = [false]) =>
      useUpdateEffect(effect, deps),
    );

    rerender([true]);
    expect(effect).toHaveBeenCalledTimes(1);

    unmount();
    expect(cleanup).toHaveBeenCalledTimes(1);
  });
});
