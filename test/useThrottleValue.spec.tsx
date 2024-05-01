import * as React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';

import { useThrottleValue } from '../src/useThrottleValue';

const mockFn = vi.fn();

function Component(options: any) {
  const [text, setText] = React.useState('');
  const throttledText = useThrottleValue(text, 500, options);

  React.useEffect(() => {
    mockFn(throttledText);
  }, [throttledText]);

  return (
    <div>
      <input onChange={event => setText(event.target.value)} type="text" />
      <p>
        Actual value:
        {text}
      </p>
      <p>
        Throttle value:
        {throttledText}
      </p>
    </div>
  );
}

describe('useThrottleValue', () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    mockFn.mockReset();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it('should throttle the value changes', () => {
    render(<Component />);

    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenLastCalledWith('');

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test' } });
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'testi' } });
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'testin' } });

    expect(mockFn).toHaveBeenCalledTimes(2);
    expect(mockFn).toHaveBeenLastCalledWith('test');

    act(() => {
      vi.advanceTimersByTime(500);
    });

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'testing' } });
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'testing my' } });
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'testing my gear' } });

    expect(mockFn).toHaveBeenCalledTimes(3);
    expect(mockFn).toHaveBeenLastCalledWith('testing');
  });

  it('should throttle the value changes with trailing', () => {
    render(<Component trailing />);

    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenLastCalledWith('');

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test' } });
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'testi' } });
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'testin' } });

    expect(mockFn).toHaveBeenCalledTimes(2);
    expect(mockFn).toHaveBeenLastCalledWith('test');

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(mockFn).toHaveBeenCalledTimes(3);
    expect(mockFn).toHaveBeenLastCalledWith('testin');

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'testing' } });
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'testing my' } });
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'testing my gear' } });

    expect(mockFn).toHaveBeenCalledTimes(4);
    expect(mockFn).toHaveBeenLastCalledWith('testing');

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(mockFn).toHaveBeenCalledTimes(5);
    expect(mockFn).toHaveBeenLastCalledWith('testing my gear');
  });
});
