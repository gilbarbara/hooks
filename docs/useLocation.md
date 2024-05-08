# useLocation

Track the browser's location.

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
