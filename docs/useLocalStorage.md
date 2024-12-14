# useLocalStorage

A custom hook to interact with the browser's `localStorage` API.  
It provides a simple way to manage persistent state, including support for serialization and deserialization of complex values.

## Usage

```tsx
import { useLocalStorage } from '@gilbarbara/hooks';

function Component() {
  const [user, setUser, removeUser] = useLocalStorage('user', { name: 'John Doe', age: 30 });

  return (
    <div>
      <div>User: {JSON.stringify(user)}</div>
      <button onClick={() => setUser({ name: 'Jane Doe', age: 25 })}>Update User</button>
      <button onClick={() => removeUser()}>Remove User</button>
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

export type UseLocalStorageResult<TValue> = [
  value: TValue | undefined,
  setValue: Dispatch<SetStateAction<TValue | undefined>>,
  remove: () => void,
];

useLocalStorage<TValue>(key, initialValue?: TValue, options?: UseLocalStorageOptions<TValue>): UseLocalStorageResult;
```

- key — localStorage key to manage.
- initialValue — the initial value to set, if the value in localStorage is empty.
- options.raw — if set to true, the hook will not attempt to JSON serialize stored values.
- options.serializer — custom serializer (defaults to JSON.stringify)
- options.deserializer — custom deserializer (defaults to JSON.parse)
