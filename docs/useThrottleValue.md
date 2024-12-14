# useThrottleValue

Returns a throttled version of a value that only updates once every specified `delayMs`.  
This hook is useful for limiting the frequency of updates for rapidly changing values, such as user inputs or scroll positions.

## Usage

```tsx
import { useCallback, useEffect, useState } from 'react';
import { useThrottleValue } from '@gilbarbara/hooks';

function Component() {
  const [text, setText] = useState('');
  const throttledText = useThrottleValue(text, 2000);

  return (
    <div>
      <input type="text" onChange={e => setText(e.target.value)} value={text} />
      <p>Throttle value: {throttledText}</p>
    </div>
  );
}
```

## Reference

```typescript
useThrottleValue<T>(value: T, delayMs: number = 500): T;
```
