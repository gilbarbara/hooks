import { Box, H2 } from '@gilbarbara/components';
import { useWindowSize } from '@gilbarbara/hooks';

import TagList from './TagList';

export default function UseWindowSize() {
  const dimensions = useWindowSize(100);

  return (
    <Box>
      <H2>useWindowSize</H2>

      <TagList data={dimensions} />
    </Box>
  );
}
