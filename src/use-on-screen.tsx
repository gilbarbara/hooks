import { useEffect, useState, MutableRefObject } from 'react';

export default function useOnScreen(ref: MutableRefObject<null | HTMLElement>, rootMargin = '0px') {
  // State and setter for storing whether element is visible
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const { current } = ref;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update our state when observer callback fires
        setIntersecting(entry.isIntersecting);
      },
      {
        rootMargin,
      },
    );

    /* istanbul ignore else */
    if (current) {
      observer.observe(current);
    }
    return () => {
      observer.unobserve(current!);
    };
  }, [ref, rootMargin]); // Empty array ensures that effect is only run on mount and unmount

  return isIntersecting;
}
