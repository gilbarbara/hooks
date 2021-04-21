import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';

import useSingleton from '../src/use-singleton';

const mockFn = jest.fn();

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
    const { getByRole } = render(<Component />);

    expect(mockFn).toHaveBeenCalledTimes(1);

    fireEvent.click(getByRole('button'));
    fireEvent.click(getByRole('button'));
    fireEvent.click(getByRole('button'));
    fireEvent.click(getByRole('button'));

    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(getByRole('button')).toMatchSnapshot();
  });
});
