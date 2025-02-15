import { act, renderHook } from '@testing-library/react';

import { USE_FETCH_STATUS, useFetch, useFetchCache } from '../src/useFetch';
import { delay } from '../src/utils';

import repositories from './__fixtures__/repositories.json';
import { getHandler, getServer, Handler } from './__setup__/msw-setup';

type Response = Array<(typeof repositories)[0]>;

const url = 'https://api.github.com/search/repositories?q=react&sort=stars';
const altURL = 'https://api.github.com/search/repositories?q=vue&sort=stars';
const failureUrl = 'https://api.github.com/search/failure';
const softFailureUrl = 'https://api.github.com/search/soft-failure';

const mockRequestOptions = {
  url,
  cache: 'no-store',
  credentials: 'same-origin',
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
  },
  method: 'GET',
  mode: 'cors',
};

const mockData = {
  total_count: 5765504,
  incomplete_results: false,
  items: repositories,
};
const mockHandlers: Handler[] = [
  { data: mockData, method: 'get', url: 'https://api.github.com/search/repositories*' },
  { method: 'get', url: failureUrl, errorType: 'hard' },
  { method: 'put', delayMs: 200, url: failureUrl, errorType: 'hard' },
  { method: 'get', url: softFailureUrl, errorType: 'soft' },
  { method: 'post', url: softFailureUrl, errorType: 'soft' },
];
const requestMock = vi.fn();
const server = getServer(mockHandlers, requestMock);

const onLoading = vi.fn();
const onSuccess = vi.fn();
const onError = vi.fn();
const onFinally = vi.fn();

describe('useFetch', () => {
  beforeAll(() => {
    server.listen();
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    server.resetHandlers(...mockHandlers.map(getHandler));
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  afterAll(() => {
    server.close();
    vi.restoreAllMocks();
    useFetchCache.clear();
  });

  it('should handle success', async () => {
    const { rerender, result } = renderHook(() => useFetch<Response>(url));

    expect(requestMock).toHaveBeenCalledWith(mockRequestOptions);

    expect(result.current.status).toBe(USE_FETCH_STATUS.LOADING);
    expect(result.current.isLoading()).toBe(true);
    expect(result.current.isFetched()).toBe(false);
    expect(result.current.isPaused()).toBe(false);
    expect(result.current.isError()).toBe(false);
    expect(result.current.isSuccess()).toBe(false);

    await vi.waitFor(() => {
      expect(result.current.status).not.toBe(USE_FETCH_STATUS.LOADING);
    });

    expect(result.current.status).toBe(USE_FETCH_STATUS.SUCCESS);
    expect(result.current.isLoading()).toBe(false);
    expect(result.current.isFetched()).toBe(true);
    expect(result.current.isPaused()).toBe(false);
    expect(result.current.isError()).toBe(false);
    expect(result.current.isSuccess()).toBe(true);

    rerender();
    expect(requestMock).toHaveBeenCalledTimes(1);
    expect(result.current.isSuccess()).toBe(true);
  });

  it('should handle refetch', async () => {
    const { result } = renderHook(() => useFetch<Response>(url));

    expect(requestMock).toHaveBeenCalledTimes(1);
    await vi.waitFor(() => {
      expect(result.current.isSuccess()).toBe(true);
    });

    result.current.refetch();
    expect(requestMock).toHaveBeenCalledTimes(2);
    await vi.waitFor(() => {
      expect(result.current.isSuccess()).toBe(true);
    });
  });

  it('should handle hard failure', async () => {
    const { rerender, result } = renderHook(() =>
      useFetch<Response>({
        url: failureUrl,
        body: JSON.stringify({ a: 1 }),
        method: 'PUT',
        type: 'urlencoded',
      }),
    );

    await vi.waitFor(() => {
      expect(result.current.status).not.toBe(USE_FETCH_STATUS.LOADING);
    });

    expect(requestMock).toHaveBeenCalledWith({
      ...mockRequestOptions,
      url: failureUrl,
      body: { a: 1 },
      headers: {
        ...mockRequestOptions.headers,
        'content-type': 'application/x-www-form-urlencoded',
      },
      method: 'PUT',
    });

    expect(result.current.status).toBe(USE_FETCH_STATUS.ERROR);
    expect(result.current.isLoading()).toBe(false);
    expect(result.current.isFetched()).toBe(true);
    expect(result.current.isPaused()).toBe(false);
    expect(result.current.isError()).toBe(true);
    expect(result.current.isSuccess()).toBe(false);

    rerender();
    expect(requestMock).toHaveBeenCalledTimes(1);
    expect(result.current.isError()).toBe(true);

    result.current.refetch(true);

    await vi.waitFor(() => {
      expect(result.current.status).toBe(USE_FETCH_STATUS.LOADING);
    });

    await vi.waitFor(() => {
      expect(result.current.status).toBe(USE_FETCH_STATUS.ERROR);
    });

    expect(requestMock).toHaveBeenCalledTimes(2);
    expect(result.current.isError()).toBe(true);
  });

  it('should handle soft failure', async () => {
    const { result } = renderHook(() =>
      useFetch<Response>({
        url: softFailureUrl,
        method: 'POST',
        body: JSON.stringify({ a: 1 }),
        headers: {
          Authorization: 'Bearer 263619d6-1da5-41fc-ba66-081acacbf9af',
        },
      }),
    );

    await vi.waitFor(() => {
      expect(result.current.status).not.toBe(USE_FETCH_STATUS.LOADING);
    });

    expect(requestMock).toHaveBeenCalledWith({
      ...mockRequestOptions,
      url: softFailureUrl,
      body: { a: 1 },
      headers: {
        ...mockRequestOptions.headers,
        authorization: 'Bearer 263619d6-1da5-41fc-ba66-081acacbf9af',
        'content-type': 'application/json',
      },
      method: 'POST',
    });

    await vi.waitFor(() => {
      expect(result.current.status).not.toBe(USE_FETCH_STATUS.LOADING);
    });

    expect(result.current.status).toBe(USE_FETCH_STATUS.ERROR);
    expect(result.current.isLoading()).toBe(false);
    expect(result.current.isFetched()).toBe(true);
    expect(result.current.isPaused()).toBe(false);
    expect(result.current.isError()).toBe(true);
    expect(result.current.isSuccess()).toBe(false);
  });

  it('should handle retries that resolves after the first error', async () => {
    vi.useFakeTimers();

    const { result } = renderHook(() =>
      useFetch<Response>({
        url: softFailureUrl,
        retries: 3,
        retryDelay: 1000,
      }),
    );

    expect(requestMock).toHaveBeenCalledWith({
      ...mockRequestOptions,
      url: softFailureUrl,
    });

    await act(async () => {
      server.use(
        getHandler({
          data: mockData,
          method: 'get',
          url: softFailureUrl,
        }),
      );
    });

    await act(async () => {
      vi.runOnlyPendingTimers();
    });

    await vi.waitFor(() => {
      expect(result.current.status).not.toBe(USE_FETCH_STATUS.LOADING);
    });

    expect(result.current.isSuccess()).toBe(true);
    expect(requestMock).toHaveBeenCalledTimes(2);
  });

  it('should handle retries that never resolves', async () => {
    vi.useFakeTimers();

    const { result } = renderHook(() =>
      useFetch<Response>({
        url: softFailureUrl,
        retries: 3,
      }),
    );

    expect(requestMock).toHaveBeenCalledWith({
      ...mockRequestOptions,
      url: softFailureUrl,
    });

    await vi.waitFor(() => {
      expect(result.current.retryCount).toBe(1);
    });

    await act(async () => {
      vi.advanceTimersByTime(1000);
    });

    expect(requestMock).toHaveBeenCalledTimes(2);

    await vi.waitFor(() => {
      expect(result.current.retryCount).toBe(2);
    });

    await act(async () => {
      vi.advanceTimersByTime(2000);
    });

    await vi.waitFor(() => {
      expect(result.current.retryCount).toBe(3);
    });

    await act(async () => {
      vi.advanceTimersByTime(3000);
    });

    expect(result.current.isError()).toBe(true);
    expect(requestMock).toHaveBeenCalledTimes(4);
  });

  it('should handle cache', async () => {
    vi.useFakeTimers();

    const { result: result1 } = renderHook(() =>
      useFetch<Response>({
        url,
        cacheTTL: 1000,
      }),
    );

    await vi.waitFor(() => {
      expect(result1.current.status).not.toBe(USE_FETCH_STATUS.LOADING);
    });

    expect(requestMock).toHaveBeenCalledTimes(1);
    expect(result1.current.isSuccess()).toBe(true);
    expect(result1.current.isCached).toBe(false);

    const { result: result2 } = renderHook(() =>
      useFetch<Response>({
        url,
        cacheTTL: 1000,
      }),
    );

    expect(requestMock).toHaveBeenCalledTimes(1);
    expect(result2.current.isLoading()).toBe(false);
    expect(result2.current.isCached).toBe(true);

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    const { result: result3 } = renderHook(() =>
      useFetch<Response>({
        url,
        cacheTTL: 2000,
      }),
    );

    await vi.waitFor(() => {
      expect(result1.current.status).not.toBe(USE_FETCH_STATUS.LOADING);
    });

    expect(requestMock).toHaveBeenCalledTimes(2);
    expect(result3.current.isCached).toBe(false);
  });

  it('should handle cache with useFetchCache utility', async () => {
    useFetchCache.set(url, repositories, 1000);

    const { result: result1 } = renderHook(() =>
      useFetch<Response>({
        url,
        cacheTTL: 1000,
      }),
    );

    expect(requestMock).toHaveBeenCalledTimes(0);
    expect(result1.current.isSuccess()).toBe(true);
    expect(result1.current.isCached).toBe(true);

    useFetchCache.clear();

    const { result: result2 } = renderHook(() =>
      useFetch<Response>({
        url,
        cacheTTL: 1000,
      }),
    );

    await vi.waitFor(() => {
      expect(result2.current.status).not.toBe(USE_FETCH_STATUS.LOADING);
    });

    expect(requestMock).toHaveBeenCalledTimes(1);
    expect(result2.current.isSuccess()).toBe(true);
    expect(result2.current.isCached).toBe(false);
  });

  it('should handle "wait"', async () => {
    const { rerender, result } = renderHook((wait: boolean = true) =>
      useFetch<Response>({ url, wait }),
    );

    expect(requestMock).not.toHaveBeenCalled();

    expect(result.current.status).toBe(USE_FETCH_STATUS.IDLE);
    expect(result.current.isLoading()).toBe(false);
    expect(result.current.isFetched()).toBe(false);
    expect(result.current.isPaused()).toBe(true);
    expect(result.current.isError()).toBe(false);
    expect(result.current.isSuccess()).toBe(false);

    rerender(false);

    expect(requestMock).toHaveBeenCalledWith(mockRequestOptions);

    await vi.waitFor(() => {
      expect(result.current.status).not.toBe(USE_FETCH_STATUS.LOADING);
    });

    expect(result.current.status).toBe(USE_FETCH_STATUS.SUCCESS);
    expect(result.current.isLoading()).toBe(false);
    expect(result.current.isFetched()).toBe(true);
    expect(result.current.isPaused()).toBe(false);
    expect(result.current.isError()).toBe(false);
    expect(result.current.isSuccess()).toBe(true);
  });

  it('should handle URL changes', async () => {
    const { rerender, result } = renderHook(options => useFetch<Response>(options), {
      initialProps: {
        url,
      },
    });

    expect(result.current.url).toBe(url);
    expect(requestMock).toHaveBeenCalledTimes(1);

    rerender({ url });
    expect(requestMock).toHaveBeenCalledTimes(1);

    rerender({ url: altURL });

    await vi.waitFor(() => {
      expect(result.current.url).toBe(altURL);
    });

    expect(requestMock).toHaveBeenCalledTimes(2);

    rerender({ url: altURL });
    expect(requestMock).toHaveBeenCalledTimes(2);
  });

  it('should handle throw with invalid parameters', async () => {
    // @ts-expect-error Testing invalid parameters
    expect(() => renderHook(() => useFetch({}))).toThrow('Expected an options object or URL');
  });

  it('should skip state updates on unmount', async () => {
    const { result, unmount } = renderHook(() =>
      useFetch<Response>({
        url: softFailureUrl,
      }),
    );

    unmount();

    await delay(100);

    expect(result.current.status).toBe(USE_FETCH_STATUS.LOADING);
  });

  it('should call onLoading when request state changes', async () => {
    renderHook(() =>
      useFetch<Response>({
        url,
        onLoading,
      }),
    );

    expect(onLoading).toHaveBeenCalledTimes(1);
  });

  it('should call onSuccess with a successful request', async () => {
    renderHook(() =>
      useFetch<Response>({
        url,
        onSuccess,
        onError,
      }),
    );

    await vi.waitFor(() => {
      expect(onSuccess).toHaveBeenCalledWith(mockData);
    });
    expect(onError).not.toHaveBeenCalled();
  });

  it('should call onError when a request fails', async () => {
    renderHook(() =>
      useFetch<Response>({
        url: failureUrl,
        onError,
        onSuccess,
      }),
    );

    await vi.waitFor(() => {
      expect(onError).toHaveBeenCalledWith(expect.objectContaining({ status: expect.any(Number) }));
    });
    expect(onSuccess).not.toHaveBeenCalled();
  });

  it('should call onFinally after success and failure', async () => {
    renderHook(() =>
      useFetch<Response>({
        url,
        onFinally,
      }),
    );

    await vi.waitFor(() => {
      expect(onFinally).toHaveBeenCalledTimes(1);
    });

    renderHook(() =>
      useFetch<Response>({
        url: failureUrl,
        onFinally,
      }),
    );

    await vi.waitFor(() => {
      expect(onFinally).toHaveBeenCalledTimes(2);
    });
  });
});

describe('useFetchCache', () => {
  it('should handle empty cache', () => {
    expect(useFetchCache.has(url)).toBe(false);
    expect(useFetchCache.get(url)).toBe(undefined);
  });

  it('should handle existing cache', () => {
    useFetchCache.set(url, repositories, 1000);

    expect(useFetchCache.has(url)).toBe(true);
    expect(useFetchCache.get(url)).toEqual({ data: repositories, expiry: expect.any(Number) });
  });

  it('should handle expired cache', () => {
    useFetchCache.set(url, repositories, -1000);

    expect(useFetchCache.has(url)).toBe(false);
    expect(useFetchCache.get(url)).toEqual(undefined);
  });

  it('should handle clearing a single url', () => {
    useFetchCache.set(url, repositories, 1000);
    useFetchCache.set(altURL, repositories, 1000);

    expect(useFetchCache.has(url)).toBe(true);
    expect(useFetchCache.has(altURL)).toBe(true);

    useFetchCache.clear(url);

    expect(useFetchCache.has(url)).toBe(false);
    expect(useFetchCache.get(url)).toEqual(undefined);
    expect(useFetchCache.has(altURL)).toBe(true);
  });

  it('should handle clearing everything', () => {
    useFetchCache.set(url, repositories, 1000);
    useFetchCache.set(altURL, repositories, 1000);

    expect(useFetchCache.has(url)).toBe(true);
    expect(useFetchCache.has(altURL)).toBe(true);

    useFetchCache.clear();

    expect(useFetchCache.has(url)).toBe(false);
    expect(useFetchCache.has(altURL)).toBe(false);
  });
});
