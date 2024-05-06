# useIsMounted

Check if the component is still mounted before changing the state.

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
