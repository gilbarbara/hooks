import * as React from 'react';
import { fireEvent, renderHook } from '@testing-library/react';

import { useLatest } from '../src/useLatest';

describe('useLatest()', () => {
  it('should return the latest value', () => {
    const fnA = () => undefined;
    const fnB = () => undefined;

    const { rerender, result } = renderHook(({ fn }) => useLatest(fn), {
      initialProps: { fn: fnA },
    });

    expect(result.current.current).toBe(fnA);
    rerender({ fn: fnB });
    expect(result.current.current).toBe(fnB);
  });

  it('should use the latest value', () => {
    const fnA = vi.fn();
    const fnB = vi.fn();

    const { rerender } = renderHook(
      ({ fn }) => {
        const latest = useLatest(fn);

        React.useEffect(() => {
          const handler = () => latest.current();

          window.addEventListener('click', handler);

          return () => {
            window.removeEventListener('click', handler);
          };
        }, [latest]);
      },
      {
        initialProps: { fn: fnA },
      },
    );

    fireEvent.click(window);
    expect(fnA).toHaveBeenCalledTimes(1);
    rerender({ fn: fnB });
    fireEvent.click(window);
    expect(fnA).toHaveBeenCalledTimes(1);
    expect(fnB).toHaveBeenCalledTimes(1);
  });
});
