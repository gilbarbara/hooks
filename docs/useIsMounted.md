# useIsMounted

Check if the component is still mounted before changing the state.  
Returns a `() => boolean`.

## Usage

```tsx
import React from 'react';
import { useIsMounted } from '@gilbarbara/hooks';

function Component() {
  const [data, setData] = React.useState('loading...');
  const isMounted = useIsMounted();

  React.useEffect(() => {
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
