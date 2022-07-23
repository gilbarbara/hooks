import * as React from 'react';
import { render, screen } from '@testing-library/react';

import useClickOutside from '../src/use-click-outside';

const mockFn = jest.fn();

function Component() {
  const ref = React.useRef<HTMLDivElement>(null);

  useClickOutside(ref, mockFn);

  return (
    <>
      <h1>Title</h1>
      <div ref={ref}>
        <button type="submit">Send</button>
        <button type="button">Reset</button>
      </div>
    </>
  );
}

describe('useClickOutside', () => {
  it('should call the callback when clicking outside', () => {
    render(<Component />);

    screen.getByRole('button', { name: 'Send' }).click();
    expect(mockFn).not.toHaveBeenCalled();

    screen.getByRole('button', { name: 'Reset' }).click();
    expect(mockFn).not.toHaveBeenCalled();

    screen.getByRole('heading').click();
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
