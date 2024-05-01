/**
 * @vitest-environment node
 */

import * as React from 'react';
import { renderToString } from 'react-dom/server';

import { useIntersectionObserver } from '../src/useIntersectionObserver';

function Component() {
  useIntersectionObserver('#root');

  return <div />;
}

describe('useIntersectionObserver-ssr', () => {
  it('should work without a DOM', () => {
    const view = renderToString(<Component />);

    expect(view).toMatchSnapshot();
  });
});
