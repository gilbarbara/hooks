# useDebounce

Defer function execution until the delay has elapsed since the last invocation.  
Useful for optimizing expensive operations like API calls triggered by user input.

> The third argument is a dependency array similar to useEffect.  
> The debounce timer resets whenever one of the dependencies changes.

## Usage

```tsx
import { useState } from 'react';
import { useDebounce } from '@gilbarbara/hooks';

function Component() {
  const [state, setState] = useState('No typing yet...');
  const [value, setValue] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');

  const { cancel } = useDebounce(
    () => {
      // This function executes after delay
      setState('Typing stopped');
      setDebouncedValue(value);
    },
    1000, // Delay in milliseconds
    [value] // Dependencies for the debounce
  );

  return (
    <div>
      <input
        type="text"
        value={value}
        placeholder="Debounced input"
        onChange={({ currentTarget }) => {
          setState('Waiting for typing to stop...');
          setValue(currentTarget.value);
        }}
      />
      <div>{state}</div>
      <p>Debounced value: {debouncedValue}</p>
      <button
        onClick={() => {
          cancel();
          setState('Debounce canceled');
        }}
      >
        Cancel debounce
      </button>
    </div>
  );
}
```

## Reference

```typescript
type UseDebounceStatus = 'pending' | 'completed' | 'cancelled';

export interface UseDebounceResult {
  cancel: () => void;
  getStatus: () => UseDebounceStatus;
}

useDebounce(
  callback: () => void,
  delayMs: number = 250,
  dependencies: React.DependencyList = [],
): UseDebounceResult;
```
