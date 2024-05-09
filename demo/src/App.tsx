import './styles.css';

import { Box, H1, Page } from '@gilbarbara/components';

import UseClickOutside from './examples/UseClickOutside';
import UseFetch from './examples/UseFetch';
import UseIntersectionObserver from './examples/UseIntersectionObserver';
import UseInterval from './examples/UseInterval';
import UseLocalStorage from './examples/UseLocalStorage';
import UseLocation from './examples/UseLocation';
import UseMeasure from './examples/UseMeasure';
import UseMediaQuery from './examples/UseMediaQuery';
import UseResizeObserver from './examples/UseResizeObserver';
import UseResponsive from './examples/UseResponsive';
import UseTimeout from './examples/UseTimeout';
import UseToggle from './examples/UseToggle';
import UseUpdate from './examples/UseUpdate';
import UseWhyDidYouUpdate from './examples/UseWhyDidYouUpdate';
import UseWindowSize from './examples/UseWindowSize';

export default function Hooks() {
  return (
    <Page align="center">
      <H1>@gilbarbara/hooks</H1>
      <Box width="100%">
        <UseClickOutside />
        <UseFetch />
        <UseIntersectionObserver />
        <UseInterval />
        <UseLocalStorage />
        <UseLocation />
        <UseMeasure />
        <UseMediaQuery />
        <UseResponsive />
        <UseResizeObserver />
        <UseTimeout />
        <UseToggle />
        <UseUpdate />
        <UseWhyDidYouUpdate />
        <UseWindowSize />
      </Box>
    </Page>
  );
}
