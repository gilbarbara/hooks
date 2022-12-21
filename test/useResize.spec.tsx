import { useState } from 'react';
import { act, render, renderHook, screen } from '@testing-library/react';

import { useResize } from '../src/useResize';

jest.useFakeTimers();

const mockCallback = jest.fn();

function Component() {
  const [isLarge, setLarge] = useState(false);

  useResize(width => {
    setLarge(width >= 1024);
  });

  return <div>{isLarge ? 'Large Screen' : 'Small Screen'}</div>;
}

describe('useResize', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call the callback on mount', () => {
    const { rerender } = renderHook(() => useResize(mockCallback));

    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback).toHaveBeenLastCalledWith(1024);

    rerender();
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it('should call the callback on resize', async () => {
    renderHook(() => useResize({ callback: mockCallback, debounce: 100 }));

    window.dispatchEvent(new Event('resize'));

    await act(async () => {
      jest.advanceTimersByTime(50);
    });
    expect(mockCallback).toHaveBeenCalledTimes(1);

    await act(async () => {
      jest.advanceTimersByTime(50);
    });
    expect(mockCallback).toHaveBeenCalledTimes(2);
  });

  it('should re-render on update', async () => {
    window = Object.assign(window, { innerWidth: 500 });

    render(<Component />);

    expect(screen.getByText('Small Screen')).toBeInTheDocument();

    await act(async () => {
      window = Object.assign(window, { innerWidth: 1024 });
      window.dispatchEvent(new Event('resize'));
      jest.runAllTimers();
    });

    expect(screen.getByText('Large Screen')).toBeInTheDocument();
  });
});
