/**
 * @vitest-environment node
 */

import * as React from 'react';
import { renderToString } from 'react-dom/server';

import { useElementMeasure } from '../src/useElementMeasure';

function Component() {
  const dimensions = useElementMeasure('#root');

  return <pre>{JSON.stringify(dimensions, null, 2)}</pre>;
}

describe('useElementMeasure-ssr', () => {
  it('should work without a DOM', () => {
    const view = renderToString(<Component />);

    expect(view).toMatchSnapshot();
  });
});
