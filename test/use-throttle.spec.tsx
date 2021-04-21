import * as React from 'react';
import { act, fireEvent, render } from '@testing-library/react';

import useThrottle from '../src/use-throttle';

jest.useFakeTimers();

const mockFn = jest.fn();

function Component({ fn = mockFn, ms = 500, ...rest }: any) {
  const throttledFn = useThrottle(fn, ms, rest);

  return (
    <button onClick={throttledFn} type="button">
      Update
    </button>
  );
}

describe('useThrottle', () => {
  afterEach(() => {
    mockFn.mockReset();
  });

  it('should throttle the callback', () => {
    const { getByRole } = render(<Component />);

    expect(mockFn).toHaveBeenCalledTimes(0);

    fireEvent.click(getByRole('button'));
    fireEvent.click(getByRole('button'));

    expect(mockFn).toHaveBeenCalledTimes(1);

    act(() => {
      jest.advanceTimersByTime(500);
    });

    fireEvent.click(getByRole('button'));
    fireEvent.click(getByRole('button'));

    expect(mockFn).toHaveBeenCalledTimes(2);
  });

  it('should throttle the callback without leading', () => {
    const { getByRole } = render(<Component leading={false} trailing />);

    fireEvent.click(getByRole('button'));

    expect(mockFn).toHaveBeenCalledTimes(0);

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(mockFn).toHaveBeenCalledTimes(1);

    fireEvent.click(getByRole('button'));
    fireEvent.click(getByRole('button'));

    expect(mockFn).toHaveBeenCalledTimes(1);

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(mockFn).toHaveBeenCalledTimes(2);
  });

  it('should throttle the callback with trailing', () => {
    const mockFn2 = jest.fn();
    const { getByRole } = render(<Component fn={mockFn2} trailing />);

    fireEvent.click(getByRole('button'));
    fireEvent.click(getByRole('button'));

    expect(mockFn2).toHaveBeenCalledTimes(1);

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(mockFn2).toHaveBeenCalledTimes(2);

    fireEvent.click(getByRole('button'));
    fireEvent.click(getByRole('button'));

    expect(mockFn2).toHaveBeenCalledTimes(3);

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(mockFn2).toHaveBeenCalledTimes(4);
  });
});
