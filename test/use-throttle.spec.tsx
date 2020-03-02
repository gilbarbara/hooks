import * as React from 'react';
import { act, fireEvent, render } from '@testing-library/react';

import useThrottle from '../src/use-throttle';

jest.useFakeTimers();

describe('useThrottle', () => {
  const mockSearch = jest.fn();

  const Component = (options: any) => {
    const [text, setText] = React.useState('');
    const throttledText = useThrottle(text, 500, options);

    React.useEffect(() => {
      if (throttledText) {
        mockSearch(throttledText);
      }
    }, [throttledText]);

    return (
      <div>
        <input type="text" onChange={e => setText(e.target.value)} />
        <p>Actual value: {text}</p>
        <p>Throttle value: {throttledText}</p>
      </div>
    );
  };
  const { getByRole } = render(<Component />);

  it('should throttle the callback', () => {
    fireEvent.change(getByRole('textbox'), { target: { value: 'test' } });
    fireEvent.change(getByRole('textbox'), { target: { value: 'testi' } });
    fireEvent.change(getByRole('textbox'), { target: { value: 'testin' } });

    expect(mockSearch).toHaveBeenCalledTimes(1);
    expect(mockSearch).toHaveBeenLastCalledWith('test');

    act(() => {
      jest.advanceTimersByTime(600);
    });

    fireEvent.change(getByRole('textbox'), { target: { value: 'testing' } });
    fireEvent.change(getByRole('textbox'), { target: { value: 'testing my' } });
    fireEvent.change(getByRole('textbox'), { target: { value: 'testing my gear' } });

    expect(mockSearch).toHaveBeenCalledTimes(2);
    expect(mockSearch).toHaveBeenLastCalledWith('testing');
  });
});
