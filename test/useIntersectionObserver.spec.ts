import { act, renderHook } from '@testing-library/react';
import { mockIntersectionObserver } from 'jsdom-testing-mocks';

import { useIntersectionObserver } from '../src/useIntersectionObserver';

const intersectionObserver = mockIntersectionObserver();

describe('useIntersectionObserver', () => {
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
    const { result } = renderHook(() => useIntersectionObserver(rootElement));

    act(() => {
      intersectionObserver.triggerNodes([rootElement]);
    });

    expect(result.current?.isIntersecting).toBe(false);

    act(() => {
      intersectionObserver.enterNode(rootElement);
    });

    expect(result.current?.isIntersecting).toBe(true);
  });

  it('should initialize with a string selector and "options"', async () => {
    const { rerender, result } = renderHook(() =>
      useIntersectionObserver(rootElement, {
        once: true,
        root: null,
        rootMargin: '0%',
        threshold: 0.5,
      }),
    );

    act(() => {
      intersectionObserver.enterNode(rootElement);
    });

    expect(result.current?.isIntersecting).toBe(true);

    rerender();

    act(() => {
      intersectionObserver.leaveNode(rootElement);
    });

    expect(result.current?.isIntersecting).toBe(true);
  });
});
