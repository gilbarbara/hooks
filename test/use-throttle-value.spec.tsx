import * as React from 'react';
import { act, fireEvent, render } from '@testing-library/react';

import useThrottleValue from '../src/use-throttle-value';

jest.useFakeTimers();

const mockFn = jest.fn();

const Component = (options: any) => {
  const [text, setText] = React.useState('');
  const throttledText = useThrottleValue(text, 500, options);

  React.useEffect(() => {
    mockFn(throttledText);
  }, [throttledText]);

  return (
    <div>
      <input type="text" onChange={e => setText(e.target.value)} />
      <p>Actual value: {text}</p>
      <p>Throttle value: {throttledText}</p>
    </div>
  );
};

describe('useThrottleValue', () => {
  afterEach(() => {
    mockFn.mockReset();
  });

  it('should throttle the value changes', () => {
    const { getByRole } = render(<Component />);
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenLastCalledWith('');

    fireEvent.change(getByRole('textbox'), { target: { value: 'test' } });
    fireEvent.change(getByRole('textbox'), { target: { value: 'testi' } });
    fireEvent.change(getByRole('textbox'), { target: { value: 'testin' } });

    expect(mockFn).toHaveBeenCalledTimes(2);
    expect(mockFn).toHaveBeenLastCalledWith('test');

    act(() => {
      jest.advanceTimersByTime(500);
    });

    fireEvent.change(getByRole('textbox'), { target: { value: 'testing' } });
    fireEvent.change(getByRole('textbox'), { target: { value: 'testing my' } });
    fireEvent.change(getByRole('textbox'), { target: { value: 'testing my gear' } });

    expect(mockFn).toHaveBeenCalledTimes(3);
    expect(mockFn).toHaveBeenLastCalledWith('testing');
  });

  it('should throttle the value changes with trailing', () => {
    const { getByRole } = render(<Component trailing />);
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenLastCalledWith('');

    fireEvent.change(getByRole('textbox'), { target: { value: 'test' } });
    fireEvent.change(getByRole('textbox'), { target: { value: 'testi' } });
    fireEvent.change(getByRole('textbox'), { target: { value: 'testin' } });

    expect(mockFn).toHaveBeenCalledTimes(2);
    expect(mockFn).toHaveBeenLastCalledWith('test');

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(mockFn).toHaveBeenCalledTimes(3);
    expect(mockFn).toHaveBeenLastCalledWith('testin');

    fireEvent.change(getByRole('textbox'), { target: { value: 'testing' } });
    fireEvent.change(getByRole('textbox'), { target: { value: 'testing my' } });
    fireEvent.change(getByRole('textbox'), { target: { value: 'testing my gear' } });

    expect(mockFn).toHaveBeenCalledTimes(4);
    expect(mockFn).toHaveBeenLastCalledWith('testing');

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(mockFn).toHaveBeenCalledTimes(5);
    expect(mockFn).toHaveBeenLastCalledWith('testing my gear');
  });
});
