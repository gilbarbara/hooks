import './styles.css';

import { Box, H1, Page } from '@gilbarbara/components';

import UseClickOutside from './examples/UseClickOutside';
import UseDebounce from './examples/UseDebounce';
import UseFetch from './examples/UseFetch';
import UseHasChanged from './examples/useHasChanged';
import UseIntersectionObserver from './examples/UseIntersectionObserver';
import UseInterval from './examples/UseInterval';
import UseLocalStorage from './examples/UseLocalStorage';
import UseLocation from './examples/UseLocation';
import UseMeasure from './examples/UseMeasure';
import UseMediaQuery from './examples/UseMediaQuery';
import UsePersistentState from './examples/usePersistentState';
import UseResizeObserver from './examples/UseResizeObserver';
import UseResponsive from './examples/UseResponsive';
import UseThrottle from './examples/UseThrottle';
import UseThrottleValue from './examples/UseThrottleValue';
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
        <UseDebounce />
        <UseFetch />
        <UseHasChanged />
        <UseIntersectionObserver />
        <UseInterval />
        <UseLocalStorage />
        <UseLocation />
        <UseMeasure />
        <UseMediaQuery />
        <UsePersistentState />
        <UseResponsive />
        <UseResizeObserver />
        <UseThrottle />
        <UseThrottleValue />
        <UseTimeout />
        <UseToggle />
        <UseUpdate />
        <UseWhyDidYouUpdate />
        <UseWindowSize />
      </Box>
    </Page>
  );
}
