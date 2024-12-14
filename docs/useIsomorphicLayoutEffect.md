# useIsomorphicLayoutEffect

Returns `useLayoutEffect` on the client and falls back to `useEffect` on the server.  
This prevents React warnings about using `useLayoutEffect` during server-side rendering (SSR).

> Avoid using this hook for effects that don’t require synchronous DOM updates. Use useEffect instead for non-DOM-related logic.

## Usage

```tsx
import { useIsomorphicLayoutEffect } from '@gilbarbara/hooks';

function Component() {
  useIsomorphicLayoutEffect(() => {
    // effect code
  }, []);

  return (
    <div>Something, something...</div>
  );
}
```

## Reference

```typescript
useIsomorphicLayoutEffect = canUseDOM() ? useLayoutEffect : useEffect;
```
