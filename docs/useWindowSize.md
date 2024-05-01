# useWindowSize

Get the window dimensions. Updates on resize.  
Returns a `WindowSize` object.

## Usage

```tsx
import React from 'react';
import { useWindowSize } from '@gilbarbara/hooks';

function Component() {
  const { width } = useWindowSize();

  return <div>{width >= 1024 ? 'Large Screen' : 'Small Screen'}</div>;
}
```

## Reference

```typescript
interface WindowSize {
  height: number;
  width: number;
}

useWindowSize(debounce?: number): WindowSize;
```
