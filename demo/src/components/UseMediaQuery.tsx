import { Box, H2, Paragraph } from '@gilbarbara/components';
import { useMediaQuery } from '@gilbarbara/hooks';

export default function UseMediaQuery() {
  const isLarge = useMediaQuery('(min-width: 768px)');

  return (
    <Box>
      <H2>useMediaQuery</H2>

      <Paragraph bold>{isLarge ? '> 768px' : '< 768px'}</Paragraph>
    </Box>
  );
}
