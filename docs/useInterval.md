# useInterval

Execute the callback at regular intervals with the specified delay.  
Pauses execution if delayMs is set to `null`.

## Usage

```tsx
import { useState } from 'react';
import { useInterval } from '@gilbarbara/hooks';

function Component() {
  const [count, setCount] = useState(0);
  const [delay, setDelay] = useState(1000);
  const [isRunning, setIsRunning] = useState(true);

  useInterval(() => setCount(prevCount => prevCount + 1), isRunning ? delay : null);

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
useInterval(callback: () => void, delayMs: number | null = 100): void;
```
