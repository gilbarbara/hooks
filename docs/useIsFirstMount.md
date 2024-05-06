# useIsFirstMount

Detect if it is the first execution.

## Usage

```tsx
import React from 'react';
import { useIsFirstMount } from '@gilbarbara/hooks';

function Component() {
  const isFirstRun = useIsFirstMount();

  return <div>Is first render: {isFirstRun ? 'yes' : 'no'}</div>;
}
```

## Reference

```typescript
useIsFirstMount(): boolean;
```
