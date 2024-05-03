/**
 * @vitest-environment node
 */

import * as React from 'react';
import { renderToString } from 'react-dom/server';

import { useMeasure } from '../src/useMeasure';

function Component() {
  const dimensions = useMeasure('#root');

  return <pre>{JSON.stringify(dimensions, null, 2)}</pre>;
}

describe('useMeasure-ssr', () => {
  it('should work without a DOM', () => {
    const view = renderToString(<Component />);

    expect(view).toMatchSnapshot();
  });
});
