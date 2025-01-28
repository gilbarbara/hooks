import { renderHook } from '@testing-library/react';

import { useLifecycleHooks } from '../src/useLifecycleHooks';

const mockMount = vi.fn();
const mockUnmount = vi.fn();

describe('useLifecycleHooks', () => {
  it('should run the mount and unmount functions', () => {
    const { rerender, unmount } = renderHook(() => useLifecycleHooks(mockMount, mockUnmount));

    expect(mockMount).toHaveBeenCalledTimes(1);
    expect(mockUnmount).toHaveBeenCalledTimes(0);

    rerender();
    expect(mockMount).toHaveBeenCalledTimes(1);
    expect(mockUnmount).toHaveBeenCalledTimes(0);

    unmount();
    expect(mockMount).toHaveBeenCalledTimes(1);
    expect(mockUnmount).toHaveBeenCalledTimes(1);
  });
});
