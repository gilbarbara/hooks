# useFetch
Make a request with fetch.  
Returns an object with  `data`, `error`,  and `status`.

## Usage

```tsx
import React from 'react';
import { useFetch } from '@gilbarbara/hooks';

function Component() {
  const { data, error, status } = useFetch(
    'https://api.github.com/search/repositories?q=react&sort=stars',
    true // you can delay the request until something finishes
  );

  return (
    <div>
      {status === 'failure' && <p>{error?.toString()}</p>}
      {status === 'success' && <p>{data}</p>}
      {status === 'running' && <p>Loading</p>}
    </div>
  );
}
```

## Reference

```typescript
type FetchStatus = 'idle' | 'running' | 'success' | 'failure';

interface UseFetchOptions {
  headers?: PlainObject;
  method?: string;
  mode?: 'cors' | 'navigate' | 'no-cors' | 'same-origin';
  body?: BodyInit;
  type?: 'json' | 'urlencoded';
  url: string;
}

interface UseFetchResponse<T> {
  data?: T;
  error?: ResponseError;
  status: FetchStatus;
}

useFetch<T = unknown>(urlOrOptions: string | UseFetchOptions, wait = false): UseFetchResponse<T>;
```
