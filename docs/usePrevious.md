# usePrevious

Return the previous value.

## Usage

```tsx
import { useState } from 'react';
import { usePrevious } from '@gilbarbara/hooks';

function Component() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);

  return <div>Now: {count}, before: {prevCount}</div>;
}
```

## Reference

```typescript
usePrevious<T>(value: T): T;
```
