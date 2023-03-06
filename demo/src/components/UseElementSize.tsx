import { useRef } from 'react';
import { Box, H2 } from '@gilbarbara/components';
import { useElementSize } from '@gilbarbara/hooks';

import BorderBox from './BorderBox';
import TagList from './TagList';

export default function UseElementSize() {
  const sizeRef = useRef<HTMLDivElement>(null);
  const { height, innerHeight, innerWidth, width } = useElementSize(sizeRef, 100);

  return (
    <Box padding="md">
      <H2>useElementSize</H2>

      <BorderBox ref={sizeRef}>
        <TagList data={{ width, height, innerWidth, innerHeight }} />
      </BorderBox>
    </Box>
  );
}
