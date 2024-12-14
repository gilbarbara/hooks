# useMediaQuery

A hook for detecting changes in media queries.  
This hook is useful for implementing responsive designs or conditionally rendering content based on viewport size or other media features.

## Usage

```tsx
import { useMediaQuery } from '@gilbarbara/hooks';

function Component() {
  const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  return (
    <div style={{ backgroundColor: isDarkMode ? '#333' : '#fff', color: isDarkMode ? '#fff' : '#000' }}>
      {isDesktop ? <p>Desktop layout</p> : <p>Mobile layout</p>}
    </div>
  );
}
```

## Reference

```typescript
// query - A valid media query string, such as:
// (min-width: 768px) or (prefers-color-scheme: dark).
useMediaQuery(query: string): boolean;
```

> This hook relies on the window.matchMedia API and will not work in environments without a DOM (e.g., server-side rendering). Use conditional checks or fallback logic in such cases.
