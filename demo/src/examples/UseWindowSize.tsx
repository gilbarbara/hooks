import { Box } from '@gilbarbara/components';
import { useWindowSize } from '@gilbarbara/hooks';

import Heading from '../components/Heading';
import TagList from '../components/TagList';

export default function UseWindowSize() {
  const dimensions = useWindowSize(100);

  return (
    <Box>
      <Heading>useWindowSize</Heading>

      <TagList data={dimensions} />
    </Box>
  );
}
