import { useRef } from 'react';
import { Box } from '@gilbarbara/components';
import { useMeasure } from '@gilbarbara/hooks';

import BorderBox from '../components/BorderBox';
import Heading from '../components/Heading';
import TagList from '../components/TagList';

export default function UseMeasure() {
  const sizeRef = useRef<HTMLDivElement>(null);
  const data = useMeasure(sizeRef, 100);

  return (
    <Box padding="md">
      <Heading>useMeasure</Heading>

      <BorderBox ref={sizeRef} maxWidth={400}>
        <TagList data={data} />
      </BorderBox>
    </Box>
  );
}
