import * as React from 'react';
import { render } from '@testing-library/react';

import useWhyDidYouUpdate from '../src/use-why-did-you-update';

describe('useWhyDidYouUpdate', () => {
  const Component = (props: any) => {
    const changes = useWhyDidYouUpdate(props, { skipLog: true });

    return <div>{!!changes && JSON.stringify(changes, null, 2)}</div>;
  };

  const { container, rerender } = render(<Component ham={1} />);

  it('should show the changes', () => {
    expect(container.firstChild).toMatchSnapshot();

    rerender(<Component ham={2} />);

    expect(container.firstChild).toMatchSnapshot();

    rerender(<Component ham={2} />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
