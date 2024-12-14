# useTimeout

Executes a callback function after a specified delay.  
This hook provides enhanced control over timers, including the ability to cancel, reset, or check the timer's status.

## Usage

```tsx
import { useState } from 'react';
import { useTimeout } from '@gilbarbara/hooks';

function Component() {
  const [description, setDescription] = useState('Function will be called in 5 seconds');

  const callback = () => {
    setDescription(`Callback called at ${Date.now()}`);
  };

  const { cancel, getStatus, reset } = useTimeout(callback, 5000);

  const status = getStatus();

  const cancelButtonClick = () => {
    if (status === 'pending') {
      cancel();
      setDescription(`Timer cancelled`);
    } else {
      reset();
      setDescription('Callback will be called in 5 seconds');
    }
  };

  const content: Record<string, ReactNode> = {
    button: 'Cancel',
    status: 'Pending',
  };

  if (status === 'cancelled') {
    content.button = 'Restart';
    content.status = 'Cancelled';
  } else if (status === 'completed') {
    content.button = 'Restart';
  }

  return (
    <div>
      <p>
        {description}
      </p>
      <button onClick={cancelButtonClick}>
        {content.button} timeout
      </button>
    </div>
  );
}
```

## Reference

```typescript

type UseTimeoutStatus = 'pending' | 'completed' | 'cancelled';

interface UseTimeoutResult {
  clear: () => void;
  getStatus: () => UseTimeoutStatus;
  set: () => void;
}

useInterval(callback: () => void, delayMs: number | null = 100): UseTimeoutResult;
```
