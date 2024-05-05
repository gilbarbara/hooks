import { act, renderHook } from '@testing-library/react';

import repositories from './__fixtures__/repositories.json';

import { PlainObject } from '../src/types';
import { USE_FETCH_STATUS, useFetch } from '../src/useFetch';

const url = 'https://api.github.com/search/repositories?q=react&sort=stars';

describe('useFetch', () => {
  beforeAll(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    fetchMock.mockClear();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it('should handle success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(repositories));

    const { rerender, result } = renderHook(() => useFetch<Array<PlainObject<any>>>(url));

    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.github.com/search/repositories?q=react&sort=stars',
      {
        body: undefined,
        cache: 'no-store',
        credentials: undefined,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'GET',
        mode: 'cors',
      },
    );

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
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(result.current.isSuccess()).toBe(true);

    result.current.refetch();
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(result.current.isSuccess()).toBe(true);
  });

  it('should handle hard failure', async () => {
    fetchMock.mockRejectOnce(new Error('Failed to fetch'));

    const { rerender, result } = renderHook(() =>
      useFetch<Array<PlainObject<any>>>({
        url,
        body: JSON.stringify({ a: 1 }),
        method: 'PUT',
        type: 'urlencoded',
      }),
    );

    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.github.com/search/repositories?q=react&sort=stars',
      {
        body: '{"a":1}',
        cache: 'no-store',
        credentials: undefined,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'PUT',
        mode: 'cors',
      },
    );

    await vi.waitFor(() => {
      expect(result.current.status).not.toBe(USE_FETCH_STATUS.LOADING);
    });

    expect(result.current.status).toBe(USE_FETCH_STATUS.ERROR);
    expect(result.current.isLoading()).toBe(false);
    expect(result.current.isFetched()).toBe(true);
    expect(result.current.isPaused()).toBe(false);
    expect(result.current.isError()).toBe(true);
    expect(result.current.isSuccess()).toBe(false);

    rerender();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(result.current.error).toEqual(new Error('Failed to fetch'));

    result.current.refetch();
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(result.current.isError()).toBe(true);
  });

  it('should handle soft failure', async () => {
    fetchMock.mockResponse('Request failed', {
      status: 400,
      statusText: 'Request failed',
    });

    const { result } = renderHook(() =>
      useFetch<Array<PlainObject<any>>>({
        url,
        method: 'POST',
        body: { a: 1 },
        headers: {
          Authorization: 'Bearer 263619d6-1da5-41fc-ba66-081acacbf9af',
        },
      }),
    );

    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.github.com/search/repositories?q=react&sort=stars',
      {
        body: '{"a":1}',
        cache: 'no-store',
        credentials: undefined,
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer 263619d6-1da5-41fc-ba66-081acacbf9af',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        mode: 'cors',
      },
    );

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
    fetchMock.mockResponse('Request failed', {
      status: 400,
      statusText: 'Request failed',
    });

    const { result } = renderHook(() =>
      useFetch<Array<PlainObject<any>>>({
        url,
        retry: 3,
        retryDelay: 1000,
      }),
    );

    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.github.com/search/repositories?q=react&sort=stars',
      {
        body: undefined,
        cache: 'no-store',
        credentials: undefined,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'GET',
        mode: 'cors',
      },
    );

    await vi.waitFor(() => {
      expect(result.current.status).not.toBe(USE_FETCH_STATUS.LOADING);
    });

    expect(result.current.isError()).toBe(true);

    fetchMock.mockResponseOnce(JSON.stringify(repositories));

    await act(async () => {
      vi.runOnlyPendingTimers();
    });

    await vi.waitFor(() => {
      expect(result.current.status).not.toBe(USE_FETCH_STATUS.LOADING);
    });

    expect(result.current.isError()).toBe(false);
    expect(result.current.isSuccess()).toBe(true);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('should handle retries that never resolves', async () => {
    vi.useFakeTimers();
    fetchMock.mockResponse('Request failed', {
      status: 400,
      statusText: 'Request failed',
    });

    const { result } = renderHook(() =>
      useFetch<Array<PlainObject<any>>>({
        url,
        retry: 3,
      }),
    );

    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.github.com/search/repositories?q=react&sort=stars',
      {
        body: undefined,
        cache: 'no-store',
        credentials: undefined,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'GET',
        mode: 'cors',
      },
    );

    await vi.waitFor(() => {
      expect(result.current.status).not.toBe(USE_FETCH_STATUS.LOADING);
    });

    expect(result.current.isError()).toBe(true);

    await act(async () => {
      vi.advanceTimersByTime(1000);
    });

    await vi.waitFor(() => {
      expect(result.current.status).not.toBe(USE_FETCH_STATUS.LOADING);
    });

    expect(result.current.isError()).toBe(true);
    expect(fetchMock).toHaveBeenCalledTimes(2);

    await act(async () => {
      vi.advanceTimersByTime(2000);
    });

    await vi.waitFor(() => {
      expect(result.current.status).not.toBe(USE_FETCH_STATUS.LOADING);
    });

    expect(result.current.isError()).toBe(true);
    expect(fetchMock).toHaveBeenCalledTimes(3);

    await act(async () => {
      vi.advanceTimersByTime(3000);
    });

    expect(result.current.isError()).toBe(true);
    expect(fetchMock).toHaveBeenCalledTimes(4);

    await act(async () => {
      vi.advanceTimersByTime(4000);
    });

    expect(result.current.isError()).toBe(true);
    expect(fetchMock).toHaveBeenCalledTimes(4);
  });

  it('should handle "wait"', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(repositories));

    const { rerender, result } = renderHook((wait: boolean = true) =>
      useFetch<Array<PlainObject<any>>>({ url, wait }),
    );

    expect(fetchMock).not.toHaveBeenCalled();

    expect(result.current.status).toBe(USE_FETCH_STATUS.IDLE);
    expect(result.current.isLoading()).toBe(false);
    expect(result.current.isFetched()).toBe(false);
    expect(result.current.isPaused()).toBe(true);
    expect(result.current.isError()).toBe(false);
    expect(result.current.isSuccess()).toBe(false);

    rerender(false);

    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.github.com/search/repositories?q=react&sort=stars',
      {
        body: undefined,
        cache: 'no-store',
        credentials: undefined,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'GET',
        mode: 'cors',
      },
    );

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

  it('should handle throw with invalid parameters', async () => {
    // @ts-expect-error Testing invalid parameters
    expect(() => renderHook(() => useFetch({}))).toThrow('Expected an options object or URL');
  });
});
