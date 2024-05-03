import { useRef } from 'react';
import { Box, H2 } from '@gilbarbara/components';
import { useMeasure } from '@gilbarbara/hooks';

import BorderBox from './BorderBox';
import TagList from './TagList';

export default function UseMeasure() {
  const sizeRef = useRef<HTMLDivElement>(null);
  const data = useMeasure(sizeRef, 100);

  return (
    <Box padding="md">
      <H2>useMeasure</H2>

      <BorderBox ref={sizeRef}>
        <TagList data={data} />
      </BorderBox>
    </Box>
  );
}
