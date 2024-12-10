# useLatest

Get a ref with the most recent value.

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
