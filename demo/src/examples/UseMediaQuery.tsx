import { Box, Paragraph } from '@gilbarbara/components';
import { useMediaQuery } from '@gilbarbara/hooks';

import Heading from '../components/Heading';

export default function UseMediaQuery() {
  const isLarge = useMediaQuery('(min-width: 768px)');

  return (
    <Box>
      <Heading>useMediaQuery</Heading>

      <Paragraph bold>{isLarge ? '> 768px' : '< 768px'}</Paragraph>
    </Box>
  );
}
