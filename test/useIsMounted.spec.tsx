import { useEffect } from 'react';
import { act, render, waitFor } from '@testing-library/react';

import { useIsMounted } from '../src/useIsMounted';

const callbackMock = vi.fn();
const delayMock = vi.fn();

const delay = (ms: number) =>
  new Promise(resolve => {
    window.setTimeout(resolve, ms);
  });

function Component() {
  const isMounted = useIsMounted();

  useEffect(() => {
    callbackMock();

    delay(30).then(() => {
      delayMock();

      if (isMounted()) {
        console.log('delay', isMounted());
        callbackMock();
      }
    });
  }, [isMounted]);

  return <div />;
}

describe('useIsMounted', () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it('should run the effect only once', async () => {
    const { unmount } = render(<Component />);

    expect(callbackMock).toHaveBeenCalledTimes(1);

    unmount();

    act(() => {
      vi.runOnlyPendingTimersAsync();
    });

    await waitFor(() => {
      expect(delayMock).toHaveBeenCalledTimes(1);
    });

    expect(callbackMock).toHaveBeenCalledTimes(1);
  });
});
