# usePrevious

Tracks and returns the previous value of a given value.

> The returned value is `undefined` on the initial render.

## Usage

```tsx
import { useState } from 'react';
import { usePrevious } from '@gilbarbara/hooks';

function Component() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count); // Stores the previous value of `count`

  return <div>Now: {count}, before: {prevCount}</div>;
}
```

## Reference

```typescript
usePrevious<T>(value: T): T;
```
