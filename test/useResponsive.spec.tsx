import * as React from 'react';
import { act, render } from '@testing-library/react';

import { Breakpoints, Orientation, useResponsive } from '../src/useResponsive';

declare let window: any;

interface Props {
  breakpoints?: Record<string, number>;
  maximum?: keyof Breakpoints | string;
  minimum?: keyof Breakpoints | string;
  orientation?: Orientation;
}

function Component({ breakpoints, maximum, minimum, orientation }: Props) {
  const { between, max, min, size } = useResponsive(breakpoints);
  let output = !minimum && !maximum;

  if (minimum && maximum) {
    output = between(minimum, maximum, orientation);
  } else if (minimum) {
    output = min(minimum, orientation);
  } else if (maximum) {
    output = max(maximum, orientation);
  }

  if (!output) {
    return null;
  }

  return (
    <div>
      <h1>{size}</h1>
    </div>
  );
}

describe('useResponsive', () => {
  const spy = jest.spyOn(console, 'warn').mockImplementation();

  afterAll(() => {
    spy.mockRestore();
  });

  describe('min', () => {
    it.each([
      [320, 'xs', 'portrait'],
      [320, 'xs', 'landscape'],
      [400, 'sm', 'portrait'],
      [400, 'sm', 'landscape'],
      [768, 'md', 'portrait'],
      [768, 'md', 'landscape'],
      [1024, 'lg', 'portrait'],
      [1024, 'lg', 'landscape'],
      [1280, 'xl', 'portrait'],
      [1280, 'xl', 'landscape'],
    ] as const)('should render properly for %p with %p and %p', (width, min, orientation) => {
      window.innerWidth = width;

      const { container } = render(<Component minimum={min} orientation={orientation} />);

      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('max', () => {
    it.each([
      [360, 'sm'],
      [568, 'sm'],
      [568, 'md'],
      [800, 'md'],
      [800, 'lg'],
      [1100, 'lg'],
      [1100, 'xl'],
      [1280, 'xl'],
    ] as const)('should render properly for %p with %p', (width, max) => {
      window.innerWidth = width;

      const { container } = render(<Component maximum={max} />);

      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('between', () => {
    it.each([
      [320, 'xs', 'sm'],
      [400, 'sm', 'md'],
      [568, 'sm', 'md'],
      [768, 'md', 'lg'],
      [1024, 'lg', 'xl'],
    ] as const)('should render properly for %p between %s/%s', (width, min, max) => {
      window.innerWidth = width;

      const { container } = render(<Component maximum={max} minimum={min} />);

      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('custom breakpoints', () => {
    const breakpoints = {
      small: 320,
      medium: 700,
      large: 1200,
    };

    it.each([
      [320, 'small', 'medium'],
      [568, 'small', 'medium'],
      [768, 'medium', 'large'],
      [1024, 'medium', 'large'],
      [1280, 'medium', 'large'],
    ])('should render properly for %p between %s/%s', (width, min, max) => {
      window.innerWidth = width;

      const { container } = render(
        <Component breakpoints={breakpoints} maximum={max} minimum={min} />,
      );

      expect(spy).toHaveBeenCalledWith('The "small" breakpoint should be 0');
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('resize', () => {
    beforeAll(() => {
      window.innerWidth = 1024;
    });

    it('should update the matcher with a window.resize', async () => {
      const { container, rerender } = render(<Component />);

      expect(container.firstChild).toMatchSnapshot();

      await act(async () => {
        window.innerWidth = 768;
        window.dispatchEvent(new Event('resize'));
      });

      rerender(<Component />);

      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
