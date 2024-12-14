# useSetState

A state hook that simplifies managing state objects by merging updates into the current state instead of replacing it.  
This hook is especially useful for managing complex or deeply nested state structures without manually merging updates.

> It automatically merges updates into the current state instead of replacing it, mimicking the behavior of this.setState in React class components.

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
