import { Box, H2, H3, H4 } from '@gilbarbara/components';
import { useResponsive } from '@gilbarbara/hooks';

export default function UseResponsive() {
  const { between, max, min, orientation, size } = useResponsive();

  return (
    <Box>
      <H2>UseResponsive</H2>
      <Box as="header" mb="md">
        <H3 variant="primary">
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
    </Box>
  );
}
