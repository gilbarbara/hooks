# useScript

Create a script tag and append it to the `document.body`.

## Usage

```tsx
import { useScript } from '@gilbarbara/hooks';

function Component() {
  const [loaded, error] = useScript(
    'https://maps.googleapis.com/maps/api/js?key=Ab2S23Bd&callback=initMap',
    'google-maps'
  );

  return (
    <div>
      {loaded && <div id="maps"/>}
      {error && <span>error</span>}
    </div>
  );
}
```

## Reference

```typescript
interface UseScriptOptions {
  async?: boolean;
  defer?: boolean;
  id?: string;
  type?: string;
}

type UseScriptResult = [loaded: boolean, error: boolean];

useScript(src: string, idOrOptions: string | UseScriptOptions = {}): UseScriptResult;
```
