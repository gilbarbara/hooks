/**
 * @vitest-environment node
 */

import * as React from 'react';
import { renderToString } from 'react-dom/server';

import { useResizeObserver } from '../src/useResizeObserver';

function Component() {
  useResizeObserver('#root');

  return <div />;
}

describe('useResizeObserver-ssr', () => {
  it('should work without a DOM', () => {
    const view = renderToString(<Component />);

    expect(view).toMatchSnapshot();
  });
});
