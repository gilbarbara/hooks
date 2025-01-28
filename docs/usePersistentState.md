# usePersistentState

A state hook that persists its value in the `localStorage`.  
It provides the functionality to synchronize state with the browser's storage, ensuring the state persists across page reloads.

## Usage

```tsx
import { usePersistentState } from '@gilbarbara/hooks';

function Component() {
  const [state, setState, remove] = usePersistentState('my-key', { foo: 'bar', baz: 'qux' });

  return (
    <div>
      <div>Value: {JSON.stringify(state, null, 2)}</div>
      <button onClick={() => setState({ foo: 'baz' })}>Change foo</button>
      <button onClick={() => setState({ baz: 'foo' })}>Change baz</button>
      <button onClick={() => remove()}>Remove</button>
    </div>
  );
}
```

## Reference

```typescript
interface UsePersistentStateOptions<TState> {
  /**
   * Check if the saved state keys are different from the initial state and override it if needed.
   * @default false
   */
  overrideDivergentSavedState?: boolean;
  /**
   * Reset properties in the saved state.
   */
  resetProperties?: Partial<TState>;
}

type UsePersistentStateResult<T> = [
  state: T,
  setState: Dispatch<SetStateAction<Partial<T>>,
  remove: () => void,
];

export function usePersistentState<TState extends PlainObject>(
  key: string,
  initialState: TState,
  options?: UsePersistentStateOptions<TState>,
): UsePersistentStateResult<TState>
```

