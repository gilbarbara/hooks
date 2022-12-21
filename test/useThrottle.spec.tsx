import * as React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';

import { useThrottle } from '../src/useThrottle';

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
    render(<Component />);

    expect(mockFn).toHaveBeenCalledTimes(0);

    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByRole('button'));

    expect(mockFn).toHaveBeenCalledTimes(1);

    act(() => {
      jest.advanceTimersByTime(500);
    });

    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByRole('button'));

    expect(mockFn).toHaveBeenCalledTimes(2);
  });

  it('should throttle the callback without leading', () => {
    render(<Component leading={false} trailing />);

    fireEvent.click(screen.getByRole('button'));

    expect(mockFn).toHaveBeenCalledTimes(0);

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(mockFn).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByRole('button'));

    expect(mockFn).toHaveBeenCalledTimes(1);

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(mockFn).toHaveBeenCalledTimes(2);
  });

  it('should throttle the callback with trailing', () => {
    const mockFn2 = jest.fn();

    const { rerender } = render(<Component fn={mockFn2} trailing />);

    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByRole('button'));

    expect(mockFn2).toHaveBeenCalledTimes(1);

    act(() => {
      jest.advanceTimersByTime(500);
    });

    rerender(<Component fn={mockFn2} trailing={false} />);

    expect(mockFn2).toHaveBeenCalledTimes(3);

    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByRole('button'));

    expect(mockFn2).toHaveBeenCalledTimes(3);

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(mockFn2).toHaveBeenCalledTimes(3);
  });
});
