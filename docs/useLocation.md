# useLocation

Tracks the browser's location, providing details about the current URL, such as the pathname, query parameters, and other location properties.

> The query property simplifies working with query parameters by returning them as a parsed object.

## Usage

```tsx
import { useLocation } from '@gilbarbara/hooks';

function Component() {
  const { pathname } = useLocation();

  return <div>{pathname === '/' ? 'Home Page' : Some content...}</div>;
}
```

## Reference

```typescript
interface UseLocationResult {
  hash: string;
  host: string;
  hostname: string;
  href: string;
  origin: string;
  pathname: string;
  port: string;
  protocol: string;
  query: Record<string, string>;
  search: string;
}

useLocation(): UseLocationResult;
```
