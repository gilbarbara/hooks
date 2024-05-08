import { renderHook } from '@testing-library/react';

import { useLifecycles } from '../src/useLifecycles';

const mockMount = vi.fn();
const mockUnmount = vi.fn();

describe('useLifecycles', () => {
  it('should run the mount and unmount functions', () => {
    const { rerender, unmount } = renderHook(() => useLifecycles(mockMount, mockUnmount));

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
