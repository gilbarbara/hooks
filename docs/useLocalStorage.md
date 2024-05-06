# useLocalStorage

Interact with the browser localStorage API.

## Usage

```tsx
import { useLocalStorage } from '@gilbarbara/hooks';

function Component() {
  const [value, setValue, remove] = useLocalStorage('my-key', 'foo');

  return (
    <div>
      <div>Value: {value}</div>
      <button onClick={() => setValue('bar')}>bar</button>
      <button onClick={() => setValue('baz')}>baz</button>
      <button onClick={() => remove()}>Remove</button>
    </div>
  );
}
```

## Reference

```typescript
type UseLocalStorageOptions<TValue> =
  | {
  raw: true;
}
  | {
  deserializer: (value: string) => TValue;
  raw: false;
  serializer: (value: TValue) => string;
};

type UseLocalStorageResult<TValue> = [
    TValue | undefined,
  Dispatch<SetStateAction<TValue | undefined>>,
  () => void,
];

useLocalStorage<TValue>(key, initialValue?: TValue, options?: UseLocalStorageOptions<TValue>): UseLocalStorageResult;
```

- key — localStorage key to manage.
- initialValue — the initial value to set, if the value in localStorage is empty.
- options.raw — if set to true, the hook will not attempt to JSON serialize stored values.
- options.serializer — custom serializer (defaults to JSON.stringify)
- options.deserializer — custom deserializer (defaults to JSON.parse)
