import * as React from 'react';
import { render } from '@testing-library/react';

import useRenderCount from '../src/use-render-count';

const Component = ({ name, version }: any) => {
  useRenderCount(name);

  return <div>{version}</div>;
};

describe('useRenderCount', () => {
  const spy = jest.spyOn(console, 'log');

  beforeAll(() => {
    console.log = jest.fn();
  });

  afterAll(() => {
    spy.mockRestore();
  });

  afterEach(() => {
    // @ts-ignore
    console.log.mockClear();
  });

  it('should log all the changes', () => {
    const { rerender } = render(<Component name="Component" version={1} />);

    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenLastCalledWith(
      '%cComponent: %c1',
      expect.any(String),
      expect.any(String),
    );

    rerender(<Component name="Component" version={2} />);

    expect(console.log).toHaveBeenCalledTimes(2);
    expect(console.log).toHaveBeenLastCalledWith(
      '%cComponent: %c2',
      expect.any(String),
      expect.any(String),
    );

    rerender(<Component name="Component" version={2} />);
    expect(console.log).toHaveBeenCalledTimes(3);
    expect(console.log).toHaveBeenLastCalledWith(
      '%cComponent: %c3',
      expect.any(String),
      expect.any(String),
    );
  });

  it('should only log the valid changes', () => {
    const MemoComponent = React.memo(Component);
    const { rerender } = render(<MemoComponent version={1} />);

    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenLastCalledWith(
      '%cRenderCount: %c1',
      expect.any(String),
      expect.any(String),
    );

    rerender(<MemoComponent version={2} />);

    expect(console.log).toHaveBeenCalledTimes(2);
    expect(console.log).toHaveBeenLastCalledWith(
      '%cRenderCount: %c2',
      expect.any(String),
      expect.any(String),
    );

    rerender(<MemoComponent version={2} />);
    expect(console.log).toHaveBeenCalledTimes(2);

    rerender(<MemoComponent version={2} />);
    expect(console.log).toHaveBeenCalledTimes(2);

    rerender(<MemoComponent version={3} />);
    expect(console.log).toHaveBeenCalledTimes(3);
    expect(console.log).toHaveBeenLastCalledWith(
      '%cRenderCount: %c3',
      expect.any(String),
      expect.any(String),
    );
  });
});
