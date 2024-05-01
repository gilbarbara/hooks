# useIsFirstRun

Detect if it is the first execution.  
Returns a `boolean`.

## Usage

```tsx
import React from 'react';
import { useIsFirstRun } from '@gilbarbara/hooks';

function Component() {
  const isFirstRun = useIsFirstRun();

  return <div>Is first render: {isFirstRun ? 'yes' : 'no'}</div>;
}
```

## Reference

```typescript
useIsFirstRun(): boolean;
```
