import * as React from 'react';
import { render } from '@testing-library/react';

import useOnScreen from '../src/use-on-screen';

describe('useOnScreen', () => {
  const Component = () => {
    const ref = React.useRef(null);
    const visible = useOnScreen(ref);

    return <div ref={ref}>{visible ? 'On Screen' : 'Offscreen'}</div>;
  };

  const { container } = render(<Component />);

  it('should render the is visible', () => {
    expect(container.firstChild).toMatchSnapshot();
  });
});
