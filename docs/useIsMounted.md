# useIsMounted

Checks if the component is still mounted before performing state updates or other side effects.

Useful for avoiding memory leaks and ensuring side effects are only performed while the component is active and prevent errors like “Can’t perform a React state update on an unmounted component.”

## Usage

```tsx
import { useEffect, useState } from 'react';
import { useIsMounted } from '@gilbarbara/hooks';

function Component() {
  const [data, setData] = useState('loading...');
  const isMounted = useIsMounted();

  useEffect(() => {
    asyncFn(`...`).then(() => {
      if (isMounted()) {
        setData('ready');
      }
    });
  }, [isMounted]);

  return <div>{data}</div>;
}
```

## Reference

```typescript
useIsMounted(): () => boolean;
```
