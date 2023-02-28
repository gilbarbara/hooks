import { act, renderHook } from '@testing-library/react';
import { mockResizeObserver } from 'jsdom-testing-mocks';

import resizeObserverResponse from './__fixtures__/resizeObserverResponse.json';

import { useElementSize } from '../src/useElementSize';

const resizeObserver = mockResizeObserver();

describe('useElementSize', () => {
  const rootElement = document.createElement('div');

  rootElement.id = 'root';
  rootElement.innerHTML = 'Hello World';

  beforeAll(() => {
    document.body.appendChild(rootElement);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    document.body.removeChild(rootElement);
  });

  it('should return the dimensions', () => {
    const { rerender, result } = renderHook(() => useElementSize(rootElement));

    expect(result.current).toMatchSnapshot('initial');

    resizeObserver.mockElementSize(rootElement, resizeObserverResponse);

    act(() => {
      resizeObserver.resize();
    });

    rerender();

    expect(result.current).toMatchSnapshot('after resize');
  });

  it('should return the dimensions with a string selector', () => {
    const { rerender, result } = renderHook(() => useElementSize('#root'));

    expect(result.current).toMatchSnapshot();

    resizeObserver.mockElementSize(rootElement, resizeObserverResponse);

    act(() => {
      resizeObserver.resize();
    });

    rerender();

    expect(result.current).toMatchSnapshot();
  });

  it('should return the default dimensions with an invalid string selector', () => {
    const { result } = renderHook(() => useElementSize('#app'));

    expect(result.current).toMatchSnapshot();
  });
});
