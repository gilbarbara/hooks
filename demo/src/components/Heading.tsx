import { PropsWithChildren } from 'react';
import { H3 } from '@gilbarbara/components';

export default function Heading({ children }: PropsWithChildren<any>) {
  return (
    <H3 as="h2" data-component-name="Heading">
      {children}
    </H3>
  );
}
