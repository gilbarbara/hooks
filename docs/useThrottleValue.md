# useThrottleValue

Return a throttled value that only changes once per every `ms`.  
*Unless you set the `trailing` option that will call it again when the timer runs out.*

## Usage

```tsx
import React, { useCallback, useEffect, useState } from 'react';
import { useThrottleValue } from '@gilbarbara/hooks';

function Component() {
  const [text, setText] = useState('');
  const throttledText = useThrottleValue(text, 500, options);

  const updater = (value) => console.log(value);
  
  useEffect(() => {
    throttledText && updater(throttledText);
  }, [throttledText]);

  return (
    <div>
      <input type="text" onChange={e => setText(e.target.value)} />
      <p>Actual value: {text}</p>
      <p>Throttle value: {throttledText}</p>
    </div>
  );
}
```

## Reference

```typescript
interface UseThrottleOptions {
  leading?: boolean; // default: true
  trailing?: boolean; // default: false
}

useThrottleValue(value: string, ms = 500, options?: UseThrottleOptions):
```
