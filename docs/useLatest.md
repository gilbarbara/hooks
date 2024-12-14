# useLatest

Returns a `ref` object containing the most recent value.  
This hook is useful for accessing the latest value in asynchronous callbacks or effects without re-triggering updates.

> Don't mutate the `current` property of the returned ref directly. This hook is intended for read-only access to the latest value.

## Usage

```tsx
import { useState } from 'react';
import { useLatest } from '@gilbarbara/hooks';

function Component() {
  const [count, setCount] = useState(0);
  const latestCount = useLatest(count);

  const handleAlertClick = () => {
    setTimeout(() => {
      alert(`Latest count value: ${latestCount.current}`);
    }, 3000);
  }

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
      <button onClick={handleAlertClick}>Show alert</button>
    </div>
  );
}
```

## Reference

```typescript
useLatest<T>(value: T): React.RefObject<T>;
```
