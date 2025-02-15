import './styles.css';

import { Box, H1, Page } from '@gilbarbara/components';

import UseBreakpoint from './examples/UseBreakpoint';
import UseClickOutside from './examples/UseClickOutside';
import UseDataChanges from './examples/UseDataChanges';
import UseDebounce from './examples/UseDebounce';
import UseElementMeasure from './examples/UseElementMeasure';
import UseFetch from './examples/UseFetch';
import UseHasChanged from './examples/useHasChanged';
import UseIntersectionObserver from './examples/UseIntersectionObserver';
import UseInterval from './examples/UseInterval';
import UseLocalStorage from './examples/UseLocalStorage';
import UseLocation from './examples/UseLocation';
import UseMediaQuery from './examples/UseMediaQuery';
import UsePersistentState from './examples/usePersistentState';
import UseResizeObserver from './examples/UseResizeObserver';
import UseThrottle from './examples/UseThrottle';
import UseThrottleValue from './examples/UseThrottleValue';
import UseTimeout from './examples/UseTimeout';
import UseToggle from './examples/UseToggle';
import UseUpdate from './examples/UseUpdate';
import UseWindowSize from './examples/UseWindowSize';

export default function Hooks() {
  return (
    <Page align="center">
      <H1>@gilbarbara/hooks</H1>
      <Box width="100%">
        <UseBreakpoint />
        <UseClickOutside />
        <UseDataChanges />
        <UseDebounce />
        <UseFetch />
        <UseHasChanged />
        <UseIntersectionObserver />
        <UseInterval />
        <UseLocalStorage />
        <UseLocation />
        <UseElementMeasure />
        <UseMediaQuery />
        <UsePersistentState />
        <UseResizeObserver />
        <UseThrottle />
        <UseThrottleValue />
        <UseTimeout />
        <UseToggle />
        <UseUpdate />
        <UseWindowSize />
      </Box>
    </Page>
  );
}
