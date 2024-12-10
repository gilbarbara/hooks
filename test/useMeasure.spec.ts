import { RefObject } from 'react';
import { act, renderHook } from '@testing-library/react';
import { mockResizeObserver } from 'jsdom-testing-mocks';

import {
  mockGetBoundingClientRectResponse,
  mockGetComputedStyleResponse,
  mockResizeObserveResponse,
} from './__fixtures__/data';

import { useMeasure, UseMeasureResult } from '../src/useMeasure';

const resizeObserver = mockResizeObserver();

function createElement(id = 'root') {
  const rootElement = document.createElement('div');

  rootElement.id = id;
  rootElement.innerHTML = 'Hello World';

  return rootElement;
}

const getComputedStyleData = mockGetComputedStyleResponse;

const { getComputedStyle } = window;

vi.spyOn(window, 'getComputedStyle').mockImplementation(el => ({
  ...getComputedStyle(el),
  ...getComputedStyleData,
}));

vi.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(
  () => mockGetBoundingClientRectResponse,
);

describe('useMeasure', () => {
  const ref = { current: null } as RefObject<Element | null>;
  const rootElement = createElement();

  beforeAll(() => {
    document.body.appendChild(rootElement);
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.restoreAllMocks();

    document.body.removeChild(rootElement);
  });

  it.each([{ target: 'element' }, { target: '#root' }, { target: 'ref' }])(
    'should return the dimensions with a "$target" target',
    ({ target }) => {
      let result: RefObject<UseMeasureResult> | null = null;
      let rerender: () => void;

      if (target === 'ref') {
        ref.current = rootElement;
        ({ rerender, result } = renderHook(() => useMeasure(ref.current)));
      } else if (target.startsWith('#')) {
        ({ rerender, result } = renderHook(() => useMeasure(target)));
      } else {
        ({ rerender, result } = renderHook(() => useMeasure(rootElement)));
      }

      expect(result?.current).toMatchSnapshot('initial');

      resizeObserver.mockElementSize(rootElement, mockResizeObserveResponse);

      act(() => {
        resizeObserver.resize();
      });

      rerender();
      expect(result.current).toMatchSnapshot('after resize');

      const { current } = result;

      rerender();
      expect(result.current).toBe(current);
    },
  );

  it('should re-initialize if target changes', async () => {
    const { rerender, result } = renderHook((target: string = '#app') => useMeasure(target));

    expect(result.current).toMatchSnapshot('initial');
    window.getComputedStyle = el => ({ ...getComputedStyle(el), ...getComputedStyleData });
    resizeObserver.mockElementSize(rootElement, mockResizeObserveResponse);

    rerender('#root');

    act(() => {
      resizeObserver.resize();
    });

    expect(result.current).toMatchSnapshot('after render');

    const { current } = result;

    rerender('#root');
    expect(result.current).toBe(current);
  });

  it('should return the default dimensions with an invalid string selector', () => {
    const { rerender, result } = renderHook(() => useMeasure('#app'));

    expect(result.current).toMatchSnapshot('initial');

    const { current } = result;

    rerender('#app');
    expect(result.current).toMatchSnapshot('after render');
    expect(result.current).toBe(current);
  });
});
