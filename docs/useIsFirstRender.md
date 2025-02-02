# useIsFirstRender

Detects whether the current render is the component's first render.  
This hook can be useful for initializing state or skipping effects on the initial mount.

## Usage

```tsx
import { useEffect } from 'react';
import { useIsFirstRender } from '@gilbarbara/hooks';

function Component() {
  const isFirstRender = useIsFirstRender();
  
  useEffect(() => {
    if (isFirstRender) {
      console.log('This will only run on the first render.');
    } else {
      console.log('This will run on subsequent renders.');
    }
  });

  return <div>Is first render: {isFirstRender.toString()}</div>;
}
```

## Reference

```typescript
useIsFirstRender(): boolean;
```
