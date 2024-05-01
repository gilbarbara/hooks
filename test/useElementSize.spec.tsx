import { MutableRefObject } from 'react';
import { act, renderHook } from '@testing-library/react';
import { mockResizeObserver } from 'jsdom-testing-mocks';

import resizeObserverResponse from './__fixtures__/resizeObserverResponse.json';

import { ElementSize, useElementSize } from '../src/useElementSize';

const resizeObserver = mockResizeObserver();

function createElement(id = 'root') {
  const rootElement = document.createElement('div');

  rootElement.id = id;
  rootElement.innerHTML = 'Hello World';

  return rootElement;
}

const computeStyle = {
  borderBottom: '0px',
  borderLeft: '0px',
  borderRight: '0px',
  borderTop: '0px',
  height: '100px',
  paddingBottom: '0px',
  paddingLeft: '0px',
  paddingRight: '0px',
  paddingTop: '0px',
  width: '200px',
};

const mockGetComputedStyle = vi.fn().mockImplementation(() => ({}));

describe('useElementSize', () => {
  const { getComputedStyle } = window;
  const ref = { current: null } as MutableRefObject<Element | null>;
  const rootElement = createElement();

  beforeAll(() => {
    window.getComputedStyle = mockGetComputedStyle;

    document.body.appendChild(rootElement);
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    window.getComputedStyle = getComputedStyle;

    document.body.removeChild(rootElement);
  });

  it.each([{ target: 'element' }, { target: '#root' }, { target: 'ref' }])(
    'should return the dimensions with a "$target" target',
    ({ target }) => {
      let result: MutableRefObject<ElementSize> | null = null;
      let rerender: () => void;

      if (target === 'ref') {
        ref.current = rootElement;
        ({ rerender, result } = renderHook(() => useElementSize(ref)));
      } else if (target.startsWith('#')) {
        ({ rerender, result } = renderHook(() => useElementSize(target)));
      } else {
        ({ rerender, result } = renderHook(() => useElementSize(rootElement)));
      }

      expect(result?.current).toMatchSnapshot('initial');

      resizeObserver.mockElementSize(rootElement, resizeObserverResponse);

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
    const { rerender, result } = renderHook((target: string = '#app') => useElementSize(target));

    expect(result.current).toMatchSnapshot('initial');
    mockGetComputedStyle.mockImplementation(() => computeStyle);
    resizeObserver.mockElementSize(rootElement, resizeObserverResponse);

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
    const { rerender, result } = renderHook(() => useElementSize('#app'));

    expect(result.current).toMatchSnapshot('initial');

    const { current } = result;

    rerender('#app');
    expect(result.current).toMatchSnapshot('after render');
    expect(result.current).toBe(current);
  });
});
