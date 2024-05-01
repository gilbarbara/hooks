/**
 * @vitest-environment node
 */

import * as React from 'react';
import { renderToString } from 'react-dom/server';

import { useWindowSize } from '../src/useWindowSize';

function Component() {
  const { height, width } = useWindowSize();

  return (
    <div>
      {height}x{width}
    </div>
  );
}

describe('useWindowSize-ssr', () => {
  it('should work without a DOM', () => {
    const view = renderToString(<Component />);

    expect(view).toMatchSnapshot();
  });
});
