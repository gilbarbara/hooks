import * as React from 'react';
import { act, render } from '@testing-library/react';

import { useScript } from '../src/useScript';

function Component() {
  const [loaded, error] = useScript(
    'https://maps.googleapis.com/maps/api/js?key=Ab2S23Bd&callback=initMap',
  );

  return (
    <div>
      {loaded && <span>loaded</span>}
      {error && <span>error</span>}
    </div>
  );
}

describe('useScript', () => {
  afterEach(() => {
    const script = document.body.querySelector('script');

    if (script) {
      script.remove();
    }
  });

  it('should insert the script and load', async () => {
    const { container } = render(<Component />);
    const script = document.body.querySelector('script');

    expect(script).toHaveAttribute(
      'src',
      'https://maps.googleapis.com/maps/api/js?key=Ab2S23Bd&callback=initMap',
    );

    act(() => {
      script?.dispatchEvent(new Event('load'));
    });

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should insert the script and fail', async () => {
    const { container } = render(<Component />);
    const script = document.body.querySelector('script');

    expect(script).toHaveAttribute(
      'src',
      'https://maps.googleapis.com/maps/api/js?key=Ab2S23Bd&callback=initMap',
    );

    act(() => {
      script?.dispatchEvent(new Event('error'));
    });

    expect(container.firstChild).toMatchSnapshot();
  });
});
