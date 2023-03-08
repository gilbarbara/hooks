import { MutableRefObject } from 'react';
import { act, renderHook } from '@testing-library/react';
import { mockResizeObserver } from 'jsdom-testing-mocks';

import resizeObserverResponse from './__fixtures__/resizeObserverResponse.json';

import { useResizeObserver } from '../src/useResizeObserver';

const resizeObserver = mockResizeObserver();

jest.useFakeTimers();

describe('useResizeObserver', () => {
  const ref = { current: null } as MutableRefObject<Element | null>;
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

  it('should initialize with an element', () => {
    const { result } = renderHook(() => useResizeObserver(rootElement));

    resizeObserver.mockElementSize(rootElement, resizeObserverResponse);

    act(() => {
      resizeObserver.resize();
    });

    expect(result.current).toMatchSnapshot();
  });

  it('should initialize with a ref', () => {
    const { result } = renderHook(() => useResizeObserver(ref));

    resizeObserver.mockElementSize(rootElement, resizeObserverResponse);

    act(() => {
      resizeObserver.resize();
    });

    expect(result.current).toMatchSnapshot();
  });

  it('should initialize with a string selector and "debounce"', async () => {
    const { rerender, result } = renderHook(() => useResizeObserver('#root', 100));

    resizeObserver.mockElementSize(rootElement, resizeObserverResponse);

    act(() => {
      resizeObserver.resize();
    });

    expect(result.current).toMatchSnapshot('first');

    rerender();

    act(() => {
      resizeObserver.resize(rootElement);
      jest.advanceTimersByTime(50);
    });

    rerender();

    act(() => {
      resizeObserver.resize(rootElement);
      jest.runOnlyPendingTimers();
    });

    expect(result.current).toMatchSnapshot('second');
  });
});
