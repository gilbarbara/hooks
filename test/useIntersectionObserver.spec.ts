import { act, renderHook } from '@testing-library/react';
import { mockIntersectionObserver } from 'jsdom-testing-mocks';

import { useIntersectionObserver } from '../src/useIntersectionObserver';

const intersectionObserver = mockIntersectionObserver();

describe('useIntersectionObserver', () => {
  const rootElement = document.createElement('div');
  const baseOptions = {
    root: null,
    rootMargin: '0%',
    threshold: 0.5,
  };

  rootElement.id = 'root';
  rootElement.innerHTML = 'Hello World';

  beforeAll(() => {
    vi.useFakeTimers();
    document.body.appendChild(rootElement);
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    document.body.removeChild(rootElement);
    vi.useRealTimers();
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
    const { rerender, result } = renderHook(options => useIntersectionObserver('#root', options), {
      initialProps: {
        ...baseOptions,
        delay: 100,
      },
    });

    act(() => {
      intersectionObserver.enterNode(rootElement);
      vi.runAllTimers();
    });

    expect(result.current?.isIntersecting).toBe(true);

    rerender({
      ...baseOptions,
      delay: 100,
    });

    act(() => {
      intersectionObserver.leaveNode(rootElement);
      vi.runAllTimers();
    });

    expect(result.current?.isIntersecting).toBe(false);
  });

  it('should observe only once', async () => {
    const { rerender, result } = renderHook(options => useIntersectionObserver('#root', options), {
      initialProps: {
        ...baseOptions,
        once: true,
      },
    });

    act(() => {
      intersectionObserver.enterNode(rootElement);
    });

    expect(result.current?.isIntersecting).toBe(true);

    rerender({
      ...baseOptions,
      once: true,
    });

    act(() => {
      intersectionObserver.leaveNode(rootElement);
    });

    expect(result.current?.isIntersecting).toBe(true);
  });
});
