import { useEffect, useRef, useState } from 'react';

import { PlainObject } from './types';
import { isPlainObject, isString, isURL } from './utils';

export type FetchStatus = 'idle' | 'running' | 'success' | 'failure';

interface ResponseError extends Error {
  response?: unknown;
  status?: number;
}

interface UseFetchOptions {
  body?: BodyInit;
  headers?: PlainObject;
  method?: string;
  mode?: 'cors' | 'navigate' | 'no-cors' | 'same-origin';
  type?: 'json' | 'urlencoded';
  url: string;
}

interface UseFetchResponse<T> {
  data?: T;
  error?: ResponseError;
  status: FetchStatus;
}

async function request(options: UseFetchOptions): Promise<any> {
  const {
    headers = {},
    method = 'GET',
    mode = 'cors',
    body = undefined,
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
      'Content-Type': type ? contentTypes[type] : 'application/json',
      ...headers,
    },
    method,
    mode,
    credentials: undefined,
  };

  params.body = body && !isString(body) && type === 'json' ? JSON.stringify(body) : body;

  return fetch(url, params).then(async response => {
    const text = await response.text();
    let content: unknown;

    try {
      content = JSON.parse(text);
    } catch {
      content = text;
    }

    if (response.status > 299) {
      const error = new Error(response.statusText) as ResponseError;

      error.status = response.status;
      error.response = content;

      throw error;
    }

    return content;
  });
}

export function useFetch<T = unknown>(
  urlOrOptions: string | UseFetchOptions,
  skip = false,
): UseFetchResponse<T> {
  const isActive = useRef(false);
  const [state, setState] = useState<UseFetchResponse<T>>({
    data: undefined,
    error: undefined,
    status: 'idle',
  });

  if (!isPlainObject(urlOrOptions) && !isURL(urlOrOptions)) {
    throw new Error('Expected an options object or URL');
  }

  useEffect(() => {
    isActive.current = true;

    return () => {
      isActive.current = false;
    };
  }, []);

  useEffect(() => {
    if (state.status === 'idle' && !skip) {
      setState(s => ({
        ...s,
        status: 'running',
      }));

      request(
        isURL(urlOrOptions)
          ? {
              type: 'json',
              url: urlOrOptions,
            }
          : urlOrOptions,
      )
        .then(data => {
          /* istanbul ignore else */
          if (isActive.current) {
            setState(s => ({
              ...s,
              data,
              status: 'success',
            }));
          }
        })
        .catch(error => {
          /* istanbul ignore else */
          if (isActive.current) {
            setState(s => ({
              ...s,
              error,
              status: 'failure',
            }));
          }
        });
    }
  }, [state, urlOrOptions, skip]);

  return state;
}
