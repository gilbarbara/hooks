# useThrottleValue

Return a throttled value that only changes once per every `ms`.

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
useThrottleValue<T>(value: T, ms = 500): T;
```
