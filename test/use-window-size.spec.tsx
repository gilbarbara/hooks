import * as React from 'react';
import { render } from '@testing-library/react';

import useWindowSize from '../src/use-window-size';

describe('useWindowSize', () => {
  const Component = () => {
    const size = useWindowSize();

    return <div>{JSON.stringify(size, null, 2)}</div>;
  };

  it('should show the changes', () => {
    const { container } = render(<Component />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
