/**
 * @jest-environment node
 */

import * as React from 'react';
import { renderToString } from 'react-dom/server';

import { useMediaQuery } from '../src/useMediaQuery';

function Component() {
  const isLarge = useMediaQuery('(min-width: 768px)');

  return <div>{isLarge.toString()}</div>;
}

describe('useMediaQuery-ssr', () => {
  it('should return a boolean', () => {
    const view = renderToString(<Component />);

    expect(view).toMatchSnapshot();
  });
});
