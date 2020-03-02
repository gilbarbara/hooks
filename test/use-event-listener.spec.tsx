import * as React from 'react';
import { act, render } from '@testing-library/react';

import useEventListener from '../src/use-event-listener';

describe('useEventListener', () => {
  const Component = () => {
    const [key, setKey] = React.useState('');

    useEventListener(
      'keydown',
      e => {
        if (e instanceof KeyboardEvent) {
          setKey(e.key);
        }
      },
      document.body,
    );

    return <div>{key}</div>;
  };

  const { container } = render(<Component />);

  it('should re-render when the event is triggered', () => {
    expect(container.firstChild).toHaveTextContent('');

    act(() => {
      document.body.dispatchEvent(new KeyboardEvent('keydown', { key: 'B' }));
    });

    expect(container.firstChild).toHaveTextContent('B');
  });
});
