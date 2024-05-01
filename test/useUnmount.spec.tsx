import { renderHook } from '@testing-library/react';

import { useUnmount } from '../src/useUnmount';

const callbackMock = vi.fn();

describe('useUnmount', () => {
  it('should execute the function only on unmount', () => {
    const { rerender, unmount } = renderHook(() =>
      useUnmount(() => {
        callbackMock();
      }),
    );

    expect(callbackMock).toHaveBeenCalledTimes(0);

    rerender();
    expect(callbackMock).toHaveBeenCalledTimes(0);

    unmount();
    expect(callbackMock).toHaveBeenCalledTimes(1);
  });
});
