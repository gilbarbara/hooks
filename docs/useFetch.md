# useFetch
A custom hook for making HTTP requests using the Fetch API.

Supports caching, dynamic URLs, retries (exponential or linear backoff), error handling, and flexible configuration options.  
It provides helper methods to check the request's status and allows manual or automatic execution.

## Usage

```tsx
import { useFetch, USE_FETCH_STATUS } from '@gilbarbara/hooks';

interface ToDo {
  completed: boolean;
  id: number,
  title: string;
  userId: number;
}

function Component() {
  const { data, error, isError, isSuccess, refetch, status } = useFetch<Array<ToDo>>(
    'https://jsonplaceholder.typicode.com/todos'
  );

  // Trigger fetch when needed
  const handleRefetch = async () => {
    await refetch();
  };

  return (
    <div>
      {status === USE_FETCH_STATUS.LOADING && <p>Loading</p>}
      {isError() && <p>{error?.toString()}</p>}
      {isSuccess() && (
        <>
          <button onClick={handleRefetch}>Refetch</button>
          <pre>{JSON.stringify(data.slice(0, 10), null, 2)}</pre>
        </>
      )}
    </div>
  );
}
```

**Advanced Usage with Manual Trigger**

```tsx
import { useState } from 'react';
import { useFetch } from '@gilbarbara/hooks';

interface ToDo {
  completed: boolean;
  id: number,
  title: string;
  userId: number;
}

function Component() {
  const [wait, setWait] = useState(true);

  const { error, data, isError, isLoading, isPaused, isSuccess, refetch } = useFetch<Array<ToDo>>({
    url: 'https://jsonplaceholder.typicode.com/todos',
    retry: 3, // Retry up to 3 times on failure
    retryDelay: (attempt: number) => Math.min(2 ** attempt * 1000, 30 * 1000), // Exponential backoff
    wait,
  });

  const handleFetch = () => {
    setWait(false);
  };

  const handleRefetch = () => {
    refetch();
  };

  return (
    <div>
      <button onClick={handleFetch} disabled={isLoading() || isSuccess()}>
        Fetch Data
      </button>
      {isLoading() && <p>Loading...</p>}
      {isError() && <p>{error?.toString()}</p>}
      {isSuccess() && (
        <>
          {data?.slice(0, 10).map(user => (
            <p>{user.title}</p>
          ))}
          <button onClick={handleRefetch}>Refetch</button>
        </>
      )}
    </div>
  );
}
```

## Caching

The useFetchCache utility provides advanced control over the global cache used by useFetch. You can use it to preload, clear, or inspect cached data. This utility is optional and meant for scenarios requiring fine-grained cache management.

**Example**

```tsx
import { useFetch, useFetchCache } from '@gilbarbara/hooks';

// Preload data with a 1-minute TTL
useFetchCache.set('https://api.example.com/data', { preloaded: true }, 60000);

function MyComponent() {
  const { data, isCached, isLoading, isSuccess } = useFetch('https://api.example.com/data', {
    cacheTTL: 60000, // Enable caching
  });

  return (
    <div>
      {isLoading() && <p>Loading...</p>}
      {isSuccess() && (
        <p>
          {isCached ? 'Loaded from cache.' : 'Fetched from server.'}
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </p>
      )}
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
  /**
   * Time to cache the request if provided.
   * When the cache is expired, the request will be triggered again.
   */
  cacheTTL?: number;
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
  error?: UseFetchError;
  isCached: boolean;
  status: UseFetchStatus;
  url: string;
}

interface UseFetchResult<TDataType> extends UseFetchState<TDataType> {
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

interface UseFetchCache {
  /**
   * Retrieves cached data for the given URL if available and not expired.
   * @param url The URL to retrieve data for.
   * @returns The cached data, or `undefined` if no valid cache exists.
   */
  get: (url: string) => any | undefined;

  /**
   * Caches data for the given URL with a specified time-to-live (TTL).
   * @param url The URL to cache data for.
   * @param data The data to cache.
   * @param ttl Time-to-live for the cached data in milliseconds.
   */
  set: (url: string, data: any, ttl: number) => void;

  /**
   * Clears cached data. If a URL is provided, only the cache for that URL is cleared.
   * If no URL is specified, the entire cache is cleared.
   * @param url Optional URL to clear the cache for.
   */
  clear: (url?: string) => void;

  /**
   * Checks if valid cached data exists for the given URL.
   * @param url The URL to check.
   * @returns `true` if the URL is cached and still valid, `false` otherwise.
   */
  has: (url: string) => boolean;
}

useFetch<TDataType = unknown>(urlOrOptions: string | UseFetchOptions): UseFetchResult<TDataType>;
```
