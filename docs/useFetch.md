# useFetch
Make a request with fetch.  
It supports retries, backoff, and more.

## Usage

```tsx
import React from 'react';
import { useFetch, USE_FETCH_STATUS, UseFetchStatus } from '@gilbarbara/hooks';

function Component() {
  const { data, error, isError, isSuccesss status } = useFetch(
    'https://api.github.com/search/repositories?q=react&sort=stars',
  );

  return (
    <div>
      {isError() && <p>{error?.toString()}</p>}
      {isSuccess() && <p>{data}</p>}
      {status === USE_FETCH_STATUS.PENDING && <p>Loading</p>}
    </div>
  );
}
```

## Reference

```typescript

const USE_FETCH_STATUS = {
  IDLE: 'IDLE',
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
} as const;

type UseFetchStatus = keyof typeof USE_FETCH_STATUS;

interface UseFetchOptions {
  body?: BodyInit | Record<string, any>;
  headers?: Record<string, string>;
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
   * @default: 3
   */
  retry?: number | false;
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

interface UseFetchError extends Error {
  response?: unknown;
  status?: number;
}

interface UseFetchState<TDataType> {
  data?: TDataType;
  error?: ResponseError;
  status: FetchStatus;
}

interface UseFetchResult<TDataType> extends UseFetchState<TDataType> {
  isError: () => boolean;
  isFetched: () => boolean;
  isLoading: () => boolean;
  isPaused: () => boolean;
  isSuccess: () => boolean;
  refetch: (eraseData?: boolean) => void;
}

useFetch<TDataType = unknown>(urlOrOptions: string | UseFetchOptions): UseFetchResult<TDataType>;
```
