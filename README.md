# @gilbarbara/hooks

[![npm version](https://badge.fury.io/js/%40gilbarbara%2Fhooks.svg)](https://badge.fury.io/js/%40gilbarbara%2Fhooks) [![build status](https://travis-ci.com/gilbarbara/hooks.svg)](https://travis-ci.com/gilbarbara/hooks) [![Maintainability](https://api.codeclimate.com/v1/badges/0bface079acbe392459c/maintainability)](https://codeclimate.com/github/gilbarbara/hooks/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/0bface079acbe392459c/test_coverage)](https://codeclimate.com/github/gilbarbara/hooks/test_coverage)

Collection of useful React hooks

## Setup

```bash
npm i @gilbarbara/hooks
```

## Hooks

### useScript
Create a script tag and append it to the `document.body`.  
Returns an `loaded` and `error` properties.

```jsx
import React from 'react';
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
};
```

**Reference**

```tsx
interface UseScriptOptions {
  async?: boolean;
  defer?: boolean;
  id?: string;
  type?: string;
}

useScript(src: string, idOrOptions: string | UseScriptOptions = {});
```



### useThrottle

Return a throttled function that only invokes `fn` once per every `ms`.  
*Unless you set the `trailing` option that will call it again when the timer runs out.*

```jsx
import React from 'react';
import { useThrottle } from '@gilbarbara/hooks';

function Component() {
  const updater = () => console.log('updated');
 	const throttledUpdater = useThrottle(updater, 500);

  return (
    <button type="button" onClick={throttledUpdater}>
      Update
    </button>
  );
}
```

**Reference**

```tsx
interface UseThrottleOptions {
  leading?: boolean; // default: true
  trailing?: boolean; // default: false
}

useThrottle(fn: () => void, ms = 500, options?: UseThrottleOptions):
```



### useThrottleValue

Return a throttled value that only changes once per every `ms`.  
*Unless you set the `trailing` option that will call it again when the timer runs out.*

```jsx
import React, { useCallback, useEffect, useState } from 'react';
import { useThrottleValue } from '@gilbarbara/hooks';

function Component() {
  const [text, setText] = useState('');
  const throttledText = useThrottleValue(text, 500, options);

  const updater = (value) => console.log(value);
  
  useEffect(() => {
    throttledText && updater(throttledText);
  }, [throttledText]);

  return (
    <div>
      <input type="text" onChange={e => setText(e.target.value)} />
      <p>Actual value: {text}</p>
      <p>Throttle value: {throttledText}</p>
    </div>
  );
};
```

**Reference**

```tsx
interface UseThrottleOptions {
  leading?: boolean; // default: true
  trailing?: boolean; // default: false
}

useThrottleValue(value: string, ms = 500, options?: UseThrottleOptions):
```



### useWhyDidYouUpdate

Get which prop changes are causing a component to re-render.

```jsx
const Component = (props: any) => {
  const changes = useWhyDidYouUpdate(props, { skipLog: true });
  // Or just log the changes
  // useWhyDidYouUpdate(props, 'Component');

  return <div>{!!changes && JSON.stringify(changes, null, 2)}</div>;
};
```

**Reference**

```tsx
interface UseWhyDidYouUpdateOptions {
  name?: string;
  skipLog?: boolean;
}

useWhyDidYouUpdate<T extends object>(
  props: T,
  nameOrOptions: string | UseWhyDidYouUpdateOptions = {},
);
```
## License

MIT
