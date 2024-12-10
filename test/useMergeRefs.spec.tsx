import { useEffect, useRef } from 'react';
import { render } from '@testing-library/react';

import { useMergeRefs } from '../src/useMergeRefs';

const mergedRefs: any = {};

function Component() {
  const firstRef = useRef<HTMLDivElement>(null);
  const secondRef = useRef<HTMLDivElement>(null);

  const functionRef = (element: HTMLDivElement) => {
    secondRef.current = element;
  };

  const ref = useMergeRefs(firstRef, functionRef);

  useEffect(() => {
    mergedRefs.a = firstRef.current;
    mergedRefs.b = secondRef.current;
  });

  return <div ref={ref} />;
}

describe('useMergeRefs', () => {
  it('should merge the refs refs', () => {
    render(<Component />);

    expect(mergedRefs.a).toBe(mergedRefs.b);
    expect(mergedRefs.b).toMatchSnapshot();
  });
});
