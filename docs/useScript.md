# useScript

Dynamically loads a script by creating a `<script>` tag and appending it to the `document.body`.  
This hook is useful for integrating third-party scripts like APIs or analytics libraries.

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

**Custom Attributes**
  
```tsx
import { useScript } from '@gilbarbara/hooks';

function Component() {
  const [loaded] = useScript('https://example.com/script.js', {
    id: 'example-script',
    async: true,
    type: 'module',
  });

  return <div>{loaded ? 'Script is ready!' : 'Loading...'}</div>;
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
