# useDebounce

Defer function execution until the delay has elapsed since the last invocation.

The third argument is the array of values that the debounce depends on, in the same manner as useEffect.  
The debounce timeout will start when one of the values changes.

## Usage

```tsx
import { useState } from 'react';
import { useDebounce } from '@gilbarbara/hooks';

function Component() {
  const [state, setState] = useState('No typing yet...');
  const [value, setValue] = React.useState('');
  const [debouncedValue, setDebouncedValue] = React.useState('');

  const { cancel } = useDebounce(
    () => {
      setState('Typing stopped');
      setDebouncedValue(value);
    },
    1000,
    [value]
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
  ms: number = 250,
  deps: DependencyList = [],
): UseDebounceResult;
```
