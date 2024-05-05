import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { PlainObject } from './types';
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
  status: UseFetchStatus;
}

export interface UseFetchResult<TDataType> extends UseFetchState<TDataType> {
  isError: () => boolean;
  isFetched: () => boolean;
  isLoading: () => boolean;
  isPaused: () => boolean;
  isSuccess: () => boolean;
  refetch: (eraseData?: boolean) => void;
}

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

export function useFetch<TDataType = unknown>(
  urlOrOptions: string | UseFetchOptions,
): UseFetchResult<TDataType> {
  const isActive = useRef(false);
  const retryCount = useRef(0);
  const [{ data, error, status }, setState] = useState<UseFetchState<TDataType>>({
    data: undefined,
    error: undefined,
    status: USE_FETCH_STATUS.IDLE,
  });
  const {
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

  if (!isPlainObject(options) || !isURL(options.url)) {
    throw new Error('Expected an options object or URL');
  }

  const getData = useCallback(
    (eraseData?: boolean) => {
      setState(s => ({
        ...s,
        data: eraseData ? undefined : s.data,
        error: undefined,
        status: USE_FETCH_STATUS.LOADING,
      }));

      request(options)
        .then(response => {
          if (isActive.current) {
            setState(s => ({
              ...s,
              data: response,
              status: USE_FETCH_STATUS.SUCCESS,
            }));
          }
        })
        .catch(responseError => {
          if (isActive.current) {
            setState(s => ({
              ...s,
              error: responseError,
              status: USE_FETCH_STATUS.ERROR,
            }));
          }

          if (retry && retryCount.current < retry) {
            retryCount.current += 1;

            setTimeout(
              getData,
              typeof retryDelay === 'function' ? retryDelay(retryCount.current) : retryDelay,
            );
          }
        });
    },
    [options, retry, retryDelay],
  );

  useEffect(() => {
    isActive.current = true;

    return () => {
      isActive.current = false;
    };
  }, []);

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
      isError,
      isFetched,
      isLoading,
      isPaused,
      isSuccess,
      refetch,
      status,
    }),
    [data, error, isError, isFetched, isLoading, isPaused, isSuccess, refetch, status],
  );
}
