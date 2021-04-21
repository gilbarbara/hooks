import * as React from 'react';
import { render } from '@testing-library/react';

import useWhyDidYouUpdate from '../src/use-why-did-you-update';

let name: string;
let skipLog: boolean;

function Component(props: any) {
  const changes = useWhyDidYouUpdate(props, { name, skipLog });

  return <div>{!!changes && JSON.stringify(changes, null, 2)}</div>;
}

describe('useWhyDidYouUpdate', () => {
  const { log } = console;

  beforeAll(() => {
    console.log = jest.fn();
  });

  afterAll(() => {
    console.log = log;
  });

  afterEach(() => {
    // @ts-ignore
    console.log.mockReset();
  });

  it('should show the changes', () => {
    skipLog = true;
    const { container, rerender } = render(<Component version={1} />);

    expect(container.firstChild).toMatchSnapshot();

    rerender(<Component version={2} />);
    expect(container.firstChild).toMatchSnapshot();

    rerender(<Component version={2} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should log the changes', () => {
    skipLog = false;
    const { rerender } = render(<Component version={1} />);

    expect(console.log).toHaveBeenCalledTimes(0);

    rerender(<Component version={2} />);

    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenLastCalledWith('[why-did-you-update]', {
      version: { from: 1, to: 2 },
    });

    rerender(<Component version={2} />);
    expect(console.log).toHaveBeenCalledTimes(1);
  });

  it('should log the changes with `name`', () => {
    name = 'Component';
    skipLog = false;
    const { rerender } = render(<Component version={1} />);

    expect(console.log).toHaveBeenCalledTimes(0);

    rerender(<Component version={2} />);

    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenLastCalledWith('[why-did-you-update: Component]', {
      version: { from: 1, to: 2 },
    });
  });
});
