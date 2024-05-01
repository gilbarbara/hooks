import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { useSingleton } from '../src/useSingleton';

const mockFn = vi.fn();

function Component() {
  const [count, setCount] = React.useState(0);

  useSingleton(() => {
    mockFn();
  });

  const handleClick = () => {
    setCount(s => s + 1);
  };

  return (
    <button onClick={handleClick} type="button">
      Count: {count}
    </button>
  );
}

describe('useSingleton', () => {
  afterEach(() => {
    mockFn.mockReset();
  });

  it('should call the singleton just once', () => {
    render(<Component />);

    expect(mockFn).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByRole('button'));

    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('button')).toMatchSnapshot();
  });
});
