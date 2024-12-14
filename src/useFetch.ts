import { useCallback, useEffect, useMemo, useRef } from 'react';

import { PlainObject } from './types';
import { useSetState } from './useSetState';
import { isPlainObject, isURL } from './utils';

export const USE_FETCH_STATUS = {
  IDLE: 'IDLE',
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
} as const;

export type UseFetchStatus = keyof typeof USE_FETCH_STATUS;

interface UseFetchError extends Error {
  response?: unknown;
  status?: number;
}

export interface UseFetchOptions {
  body?: BodyInit | Record<string, any>;
  /**
   * Time to cache the request if provided.
   * When the cache is expired, the request will be triggered again.
   */
  cacheTTL?: number;
  headers?: PlainObject<string>;
  /**
   * HTTP method.
   * @default: 'GET'
   */
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS' | 'CONNECT' | 'TRACE';
  /**
   * Request mode.
   * @default: 'cors'
   */
  mode?: 'cors' | 'navigate' | 'no-cors' | 'same-origin';
  /**
   * Number of retries.
   */
  retry?: number;
  /**
   * Time to wait before retrying.
   * A function like attempt => Math.min(attempt > 1 ? 2 ** attempt * 1000 : 1000, 30 * 1000) applies exponential backoff.
   * A function like attempt => attempt * 1000 applies linear backoff.
   * @default: attempt => attempt * 1000
   */
  retryDelay?: number | ((attempt: number) => number);
  /**
   * Request type.
   * @default: 'json'
   */
  type?: 'json' | 'urlencoded';
  url: string;
  /**
   * Wait for the user to trigger the request.
   * @default: false
   */
  wait?: boolean;
}

interface UseFetchState<TDataType> {
  data?: TDataType;
  error?: UseFetchError;
  isCached: boolean;
  status: UseFetchStatus;
  url: string;
}

export interface UseFetchResult<TDataType> extends UseFetchState<TDataType> {
  /**
   * Whether the response is cached.
   */
  isCached: boolean;
  isError: () => boolean;
  isFetched: () => boolean;
  isLoading: () => boolean;
  isPaused: () => boolean;
  isSuccess: () => boolean;
  refetch: (eraseData?: boolean) => void;
}

const globalCache = new Map<string, { data: any; expiry: number }>();

async function request(options: UseFetchOptions): Promise<any> {
  const {
    body = undefined,
    headers = {},
    method = 'GET',
    mode = 'cors',
    type = 'json',
    url = '',
  } = options;

  const contentTypes = {
    json: 'application/json',
    urlencoded: 'application/x-www-form-urlencoded',
  };

  const params: RequestInit = {
    body: undefined,
    cache: 'no-store' as const,
    headers: {
      Accept: 'application/json',
      'Content-Type': contentTypes[type],
      ...headers,
    },
    method,
    mode,
    credentials: undefined,
  };

  if (body) {
    params.body = (
      isPlainObject(body) && type === 'json' ? JSON.stringify(body) : body
    ) as BodyInit;
  }

  return fetch(url, params).then(async response => {
    const text = await response.text();
    let content: unknown;

    try {
      content = JSON.parse(text);
    } catch {
      content = text;
    }

    if (response.status > 299) {
      const error = new Error(response.statusText) as UseFetchError;

      error.status = response.status;
      error.response = content;

      throw error;
    }

    return content;
  });
}

export const useFetchCache = {
  /**
   * Retrieve data from the cache.
   * @param url The URL to retrieve data for.
   * @returns Cached data or `undefined` if not found or expired.
   */
  get(url: string) {
    const cached = globalCache.get(url);

    if (cached && Date.now() < cached.expiry) {
      return cached;
    }

    globalCache.delete(url); // Remove expired entry

    return undefined;
  },

  /**
   * Set data in the cache.
   * @param url The URL to cache data for.
   * @param data The data to cache.
   * @param ttl Time-to-live in milliseconds.
   */
  set(url: string, data: any, ttl: number) {
    globalCache.set(url, { data, expiry: Date.now() + ttl });
  },

  /**
   * Clear the cache.
   * @param url Optional URL to clear. Clears all cache if not specified.
   */
  clear(url?: string) {
    if (url) {
      globalCache.delete(url);
    } else {
      globalCache.clear();
    }
  },

  /**
   * Check if a URL is cached and still valid.
   * @param url The URL to check.
   * @returns `true` if cached and valid, `false` otherwise.
   */
  has(url: string) {
    const cached = globalCache.get(url);

    return !!cached && Date.now() < cached.expiry;
  },
};

export function useFetch<TDataType = unknown>(
  urlOrOptions: string | UseFetchOptions,
): UseFetchResult<TDataType> {
  const isActive = useRef(false);
  const retryCount = useRef(0);
  const {
    cacheTTL = 0,
    retry = 0,
    retryDelay = (attempt: number) => attempt * 1000,
    wait = false,
    ...options
  } = isURL(urlOrOptions)
    ? ({
        type: 'json',
        url: urlOrOptions,
      } as const)
    : urlOrOptions;
  const [{ data, error, isCached, status, url }, setState] = useSetState<UseFetchState<TDataType>>({
    data: undefined,
    error: undefined,
    isCached: false,
    status: USE_FETCH_STATUS.IDLE,
    url: options.url,
  });

  if (!isPlainObject(options) || !isURL(url)) {
    throw new Error('Expected an options object or URL');
  }

  const getData = useCallback(
    async (eraseData?: boolean) => {
      setState(s => ({
        data: eraseData ? undefined : s.data,
        error: undefined,
        isCached: false,
        status: USE_FETCH_STATUS.LOADING,
      }));

      // Check cache
      if (cacheTTL && useFetchCache.has(url) && !eraseData) {
        const cached = useFetchCache.get(url);

        if (cached) {
          setState({
            data: cached.data,
            error: undefined,
            isCached: true,
            status: USE_FETCH_STATUS.SUCCESS,
          });

          return;
        }
      }

      try {
        const response = await request({ ...options });

        if (cacheTTL) {
          useFetchCache.set(url, response, cacheTTL);
        }

        if (isActive.current) {
          setState({
            data: response,
            status: USE_FETCH_STATUS.SUCCESS,
          });
        }
      } catch (responseError: any) {
        if (isActive.current) {
          setState({
            error: responseError,
            status: USE_FETCH_STATUS.ERROR,
          });
        }

        if (retry && retryCount.current < retry) {
          retryCount.current += 1;

          setTimeout(
            getData,
            typeof retryDelay === 'function' ? retryDelay(retryCount.current) : retryDelay,
          );
        }
      }
    },
    [cacheTTL, options, retry, retryDelay, setState, url],
  );

  useEffect(() => {
    isActive.current = true;

    return () => {
      isActive.current = false;
    };
  }, []);

  useEffect(() => {
    if (url !== options.url) {
      setState({
        data: undefined,
        error: undefined,
        status: USE_FETCH_STATUS.IDLE,
        url: options.url,
      });
    }
  }, [options.url, setState, url]);

  useEffect(() => {
    if (status === USE_FETCH_STATUS.IDLE && !wait) {
      getData();
    }
  }, [getData, status, wait]);

  const isError = useCallback(() => status === USE_FETCH_STATUS.ERROR, [status]);
  const isFetched = useCallback(
    () => ([USE_FETCH_STATUS.SUCCESS, USE_FETCH_STATUS.ERROR] as UseFetchStatus[]).includes(status),
    [status],
  );
  const isLoading = useCallback(() => status === USE_FETCH_STATUS.LOADING, [status]);
  const isPaused = useCallback(() => status === USE_FETCH_STATUS.IDLE && wait, [status, wait]);
  const isSuccess = useCallback(() => status === USE_FETCH_STATUS.SUCCESS, [status]);
  const refetch = useCallback((eraseData = false) => getData(eraseData), [getData]);

  return useMemo(
    () => ({
      data,
      error,
      isCached,
      isError,
      isFetched,
      isLoading,
      isPaused,
      isSuccess,
      refetch,
      status,
      url,
    }),
    [
      data,
      error,
      isCached,
      isError,
      isFetched,
      isLoading,
      isPaused,
      isSuccess,
      refetch,
      status,
      url,
    ],
  );
}
