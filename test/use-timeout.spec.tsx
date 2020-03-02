import * as React from 'react';
import { act, fireEvent, render } from '@testing-library/react';

import useTimeout from '../src/use-timeout';

jest.useFakeTimers();

describe('useTimeout', () => {
  const Component = () => {
    const [count, setCount] = React.useState(0);

    const stopTimeout = useTimeout(() => setCount(count + 1), 5000);

    const handleClick = React.useCallback(() => {
      stopTimeout();
    }, [stopTimeout]);

    return (
      <div>
        <h1>{count}</h1>
        <button type="button" onClick={handleClick}>
          Stop
        </button>
      </div>
    );
  };

  it('should re-render when the timeout ends', () => {
    const { container } = render(<Component />);

    expect(container.querySelector('h1')).toHaveTextContent('0');

    act(() => {
      jest.advanceTimersByTime(1000);
      expect(container.querySelector('h1')).toHaveTextContent('0');
    });

    act(() => {
      jest.advanceTimersByTime(5000);
      expect(container.querySelector('h1')).toHaveTextContent('1');
    });
  });

  it('should stop it when needed', () => {
    const { container } = render(<Component />);

    fireEvent.click(container.querySelector('button')!);

    act(() => {
      jest.advanceTimersByTime(10000);
      expect(container.querySelector('h1')).toHaveTextContent('0');
    });
  });
});
