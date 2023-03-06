import { forwardRef } from 'react';
import { Box, BoxProps } from '@gilbarbara/components';

const BorderBox = forwardRef<HTMLDivElement, BoxProps>((props, ref) => {
  return (
    <Box
      ref={ref}
      border={[
        {
          side: 'all',
          size: 2,
          style: 'dotted',
          shade: 'mid',
          variant: 'primary',
        },
      ]}
      mx="auto"
      padding="md"
      radius="md"
      {...props}
    />
  );
});

export default BorderBox;
