import { useEffect } from 'react';
import { act, render, waitFor } from '@testing-library/react';

import { useIsMounted } from '../src/useIsMounted';

jest.useFakeTimers();

const callbackMock = jest.fn();
const delayMock = jest.fn();

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

describe('useEffectOnce', () => {
  it('should run the effect only once', async () => {
    const { unmount } = render(<Component />);

    expect(callbackMock).toHaveBeenCalledTimes(1);

    unmount();

    act(() => {
      jest.runOnlyPendingTimers();
    });

    await waitFor(() => {
      expect(delayMock).toHaveBeenCalledTimes(1);
    });

    expect(callbackMock).toHaveBeenCalledTimes(1);
  });
});
