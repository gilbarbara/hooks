# useInterval

Execute the callback repeatedly with the specified delay.  
It can be paused by setting the delay to `null`.

## Usage

```tsx
import { useState } from 'react';
import { useInterval } from '@gilbarbara/hooks';

function Component() {
  const [count, setCount] = useState(0);
  const [delay, setDelay] = useState(1000);
  const [isRunning, setIsRunning] = useState(true);

  useInterval(
    () => {
      setCount(count + 1);
    },
    isRunning ? delay : null
  );

  return (
    <div>
      <div>
        delay: <input value={delay} onChange={event => setDelay(Number(event.target.value))} />
      </div>
      <h1>count: {count}</h1>
      <div>
        <button onClick={() => setIsRunning(!isRunning)}>{isRunning ? 'stop' : 'start'}</button>
      </div>
    </div>
  );
}
```

## Reference

```typescript
useInterval(callback: () => void, delay: number | null = 100): void;
```
