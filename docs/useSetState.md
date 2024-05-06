# useSetState

A state hook that returns a setState that merges object changes into the current state instead of replacing it.

## Usage

```tsx
import { useSetState } from '@gilbarbara/hooks';

function Component() {
  const [state, setState] = useSetState({ count: 0, gretting: 'hey' });

  return (
    <div>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <button onClick={() => setState({ gretting: 'hello' })}>hello</button>
      <button onClick={() => setState({ gretting: 'hi' })}>hi</button>
      <button
        onClick={() => {
          setState((prevState) => ({
            count: (prevState?.count || 0) + 1,
          }));
        }}
      >
        count
      </button>
    </div>
  );
}
```

## Reference

```typescript
useSetState<T extends Record<string, any>>(
  initialState: T = {} as T,
): [T, (patch: Patch<T>) => void]
```
