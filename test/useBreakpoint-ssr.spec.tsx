/**
 * @vitest-environment node
 */

import * as React from 'react';
import { renderToString } from 'react-dom/server';

import { useBreakpoint } from '../src/useBreakpoint';

function Component({ height, width }: any) {
  const { max, min, orientation, size } = useBreakpoint(undefined, width, height);

  return (
    <div>
      {max('sm') && <p>{size}</p>}
      {!max('sm') && max('md') && <p>{size}</p>}
      {min('xl') && <p>{size}</p>}
      <p>{orientation}</p>
    </div>
  );
}

describe('useBreakpoint', () => {
  it('should render the largest breakpoint with the default width and height', () => {
    const view = renderToString(<Component />);

    expect(view).toMatchSnapshot();
  });

  it('should render the smallest breakpoint with 400x640', () => {
    const view = renderToString(<Component height={640} width={360} />);

    expect(view).toMatchSnapshot();
  });

  it('should render the "sm" breakpoint and landscape with 640x400', () => {
    const view = renderToString(<Component height={400} width={640} />);

    expect(view).toMatchSnapshot();
  });
});
