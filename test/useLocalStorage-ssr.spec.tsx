/**
 * @vitest-environment node
 */

import * as React from 'react';
import { renderToString } from 'react-dom/server';

import { useLocalStorage } from '../src/useLocalStorage';

function Component() {
  const [value] = useLocalStorage('root', 'foo');

  return <div>{value}</div>;
}

describe('useLocalStorage-ssr', () => {
  beforeAll(() => {
    vi.spyOn(global.console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it('should return the initial value', () => {
    const view = renderToString(<Component />);

    expect(view).toMatchSnapshot();
    expect(console.error).toHaveBeenCalledWith('`useLocalStorage` is not available.');
  });
});
