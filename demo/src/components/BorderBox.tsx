import { forwardRef } from 'react';
import { Box, Props } from '@gilbarbara/components';

const BorderBox = forwardRef<HTMLDivElement, Props.BoxProps>((props, ref) => {
  return (
    <Box
      ref={ref}
      border={[
        {
          side: 'all',
          size: 2,
          style: 'dotted',
          color: 'primary.500',
        },
      ]}
      data-component-name="BorderBox"
      mx="auto"
      padding="md"
      radius="md"
      {...props}
    />
  );
});

export default BorderBox;
