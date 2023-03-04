import { useState } from 'react';
import { render, screen } from '@testing-library/react';

import { useEffectOnce } from '../src/useEffectOnce';

function Component() {
  const [value, setValue] = useState(0);

  useEffectOnce(() => {
    setValue(1);
  });

  return <div data-testid="main">{value}</div>;
}

describe('useEffectOnce', () => {
  it('should run the effect only once', () => {
    const { rerender } = render(<Component />);

    expect(screen.getByTestId('main')).toMatchSnapshot('first');

    rerender(<Component />);

    expect(screen.getByTestId('main')).toMatchSnapshot('second');
  });
});
