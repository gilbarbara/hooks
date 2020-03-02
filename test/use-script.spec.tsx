import * as React from 'react';
import { render, waitForElement } from '@testing-library/react';

import useScript from '../src/use-script';

describe('useScript', () => {
  const Component = () => {
    const [loaded] = useScript(
      'https://maps.googleapis.com/maps/api/js?key=Ab2S23Bd&callback=initMap',
    );

    return <div>{loaded && <span>loaded</span>}</div>;
  };

  const { container } = render(<Component />);

  it('should re-render the id has changed', async () => {
    expect(container.firstChild).toMatchSnapshot();

    const script = await waitForElement(() => document.body.querySelector('script'));

    expect(script).toHaveAttribute(
      'src',
      'https://maps.googleapis.com/maps/api/js?key=Ab2S23Bd&callback=initMap',
    );
  });
});
