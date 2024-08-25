import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { useClickOutside } from '../src/useClickOutside';

const mockFn = vi.fn();

function Component() {
  const ref = useClickOutside<HTMLDivElement>(mockFn);

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
  it('should execute the callback when clicking outside', () => {
    render(<Component />);
    console.log(mockFn.mock.calls);

    screen.getByRole('button', { name: 'Send' }).click();
    expect(mockFn).not.toHaveBeenCalled();

    screen.getByRole('button', { name: 'Reset' }).click();
    expect(mockFn).not.toHaveBeenCalled();

    screen.getByRole('heading').click();
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
