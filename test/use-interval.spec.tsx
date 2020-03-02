import * as React from 'react';
import { act, fireEvent, render } from '@testing-library/react';

import useInterval from '../src/use-interval';

jest.useFakeTimers();

describe('useInterval', () => {
  const Component = () => {
    const [count, setCount] = React.useState(0);

    const stopInterval = useInterval(() => setCount(count + 1), 1000);

    const handleClick = React.useCallback(() => {
      stopInterval();
    }, [stopInterval]);

    return (
      <div>
        <h1>{count}</h1>
        <button type="button" onClick={handleClick}>
          Stop
        </button>
      </div>
    );
  };

  const { container } = render(<Component />);

  it('should re-render when the interval runs and stop it when needed', () => {
    expect(container.querySelector('h1')).toHaveTextContent('0');

    act(() => {
      jest.advanceTimersByTime(1000);
      expect(container.querySelector('h1')).toHaveTextContent('1');
    });

    act(() => {
      jest.advanceTimersByTime(9000);
      expect(container.querySelector('h1')).toHaveTextContent('10');
    });

    fireEvent.click(container.querySelector('button')!);

    act(() => {
      jest.advanceTimersByTime(10000);
      expect(container.querySelector('h1')).toHaveTextContent('10');
    });
  });
});
