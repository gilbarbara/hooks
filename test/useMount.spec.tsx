import { renderHook } from '@testing-library/react';

import { useMount } from '../src/useMount';

const callbackMock = vi.fn();

describe('useMount', () => {
  it('should execute the function only once', () => {
    const { rerender } = renderHook(() =>
      useMount(() => {
        callbackMock();
      }),
    );

    expect(callbackMock).toHaveBeenCalledTimes(1);

    rerender();

    expect(callbackMock).toHaveBeenCalledTimes(1);
  });
});
