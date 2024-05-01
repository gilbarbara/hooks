# useUnmount

Run the callback when the component unmounts.

## Usage

```tsx
import React from 'react';
import { useUnmount } from '@gilbarbara/hooks';

function Component() {
  useUnmount(() => {
    // cleanup the listener
  });

  return <div>Some content...</div>;
}
```

## Reference

```typescript
useUnmount(fn: () => void): void;
```
