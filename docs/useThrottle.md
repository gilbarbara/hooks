# useThrottle

Return a throttled function that only invokes `fn` once per every `ms`.  
*Unless you set the `trailing` option that will call it again when the timer runs out.*

## Usage

```tsx
import React from 'react';
import { useThrottle } from '@gilbarbara/hooks';

function Component() {
  const updater = () => console.log('updated');
 	const throttledUpdater = useThrottle(updater, 500);

  return (
    <button type="button" onClick={throttledUpdater}>
      Update
    </button>
  );
}
```

## Reference

```typescript
interface UseThrottleOptions {
  leading?: boolean; // default: true
  trailing?: boolean; // default: false
}

useThrottle(fn: () => void, ms = 500, options?: UseThrottleOptions):
```
