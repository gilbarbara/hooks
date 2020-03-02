import { useCallback, useEffect, useState } from 'react';
import { canUseDOM } from './utils';

export default function useWindowSize() {
  const getSize = useCallback(
    () => ({
      width: canUseDOM ? window.innerWidth : undefined,
      height: canUseDOM ? window.innerHeight : undefined,
    }),
    [],
  );

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!canUseDOM) {
      return undefined;
    }

    const handleResize = () => {
      setWindowSize(getSize());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [getSize]); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
}
