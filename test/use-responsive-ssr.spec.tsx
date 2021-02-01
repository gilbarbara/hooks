/**
 * @jest-environment node
 */

import * as React from 'react';
import { renderToString } from 'react-dom/server';

import useResponsive from '../src/use-responsive';

const Component = ({ width, height }: any) => {
  const { size, min, max, orientation } = useResponsive(undefined, width, height);

  return (
    <div>
      {max('sm') && <p>{size}</p>}
      {!max('sm') && max('md') && <p>{size}</p>}
      {min('xl') && <p>{size}</p>}
      <p>{orientation}</p>
    </div>
  );
};

describe('useResponsive', () => {
  it('should render the largest breakpoint with the default width and height', () => {
    const html = renderToString(<Component />);

    expect(html).toMatchSnapshot();
  });

  it('should render the smallest breakpoint with 400x640', () => {
    const html = renderToString(<Component width={360} height={640} />);

    expect(html).toMatchSnapshot();
  });

  it('should render the "sm" breakpoint and landscape with 640x400', () => {
    const html = renderToString(<Component width={640} height={400} />);

    expect(html).toMatchSnapshot();
  });
});
