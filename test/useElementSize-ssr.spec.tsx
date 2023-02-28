/**
 * @jest-environment node
 */

import * as React from 'react';
import { renderToString } from 'react-dom/server';

import { useElementSize } from '../src/useElementSize';

function Component() {
  const dimensions = useElementSize('#root');

  return <pre>{JSON.stringify(dimensions, null, 2)}</pre>;
}

describe('useElementSize-ssr', () => {
  it('should work without a DOM', () => {
    const view = renderToString(<Component />);

    expect(view).toMatchSnapshot();
  });
});
