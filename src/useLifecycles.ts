import { useEffect } from 'react';

export function useLifecycles(mount: () => void, unmount: () => void) {
  useEffect(() => {
    mount();

    return unmount;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
