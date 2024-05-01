# useIsomorphicLayoutEffect

Returns `useLayoutEffect` in the client or `useEffect` on the server.

## Usage

```tsx
import React from 'react';
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
