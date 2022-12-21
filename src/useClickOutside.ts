import { RefObject, useEffect } from 'react';

export function useClickOutside(ref: RefObject<HTMLElement>, callback: () => void) {
  const handleClick = (event: MouseEvent | TouchEvent) => {
    if (!ref.current?.contains(event.target as Node)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  });
}
