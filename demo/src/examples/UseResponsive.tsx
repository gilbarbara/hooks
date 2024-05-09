import { Box, H3, H4 } from '@gilbarbara/components';
import { useResponsive } from '@gilbarbara/hooks';

import Block from '../components/Block';
import Heading from '../components/Heading';

export default function UseResponsive() {
  const { between, max, min, orientation, size } = useResponsive();

  return (
    <Block>
      <Heading>UseResponsive</Heading>
      <Box as="header" mb="md">
        <H3 color="primary">
          {size} - {orientation}
        </H3>
      </Box>
      {max('sm', 'landscape') && <H4>Extra Small in Landscape</H4>}
      {between('sm', 'lg') && <H4>Between Small and Large</H4>}
      <p>Extra Small {min('xs') ? '✅' : '🚫'}</p>
      <p>Small {min('sm') ? '✅' : '🚫'}</p>
      <p>Medium {min('md') ? '✅' : '🚫'}</p>
      <p>Large {min('lg') ? '✅' : '🚫'}</p>
      <p>Extra Large {min('xl') ? '✅' : '🚫'}</p>
    </Block>
  );
}
