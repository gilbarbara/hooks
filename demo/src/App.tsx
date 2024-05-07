import './styles.css';

import { Divider, H1, Page } from '@gilbarbara/components';

import UseClickOutside from './examples/UseClickOutside';
import UseFetch from './examples/UseFetch';
import UseIntersectionObserver from './examples/UseIntersectionObserver';
import UseInterval from './examples/UseInterval';
import UseMeasure from './examples/UseMeasure';
import UseMediaQuery from './examples/UseMediaQuery';
import UseResizeObserver from './examples/UseResizeObserver';
import UseResponsive from './examples/UseResponsive';
import UseTimeout from './examples/UseTimeout';
import UseWindowSize from './examples/UseWindowSize';

export default function Hooks() {
  return (
    <Page align="center">
      <H1>@gilbarbara/hooks</H1>
      <div>
        <UseClickOutside />
        <Divider my="jumbo" />
        <UseFetch />
        <Divider my="jumbo" />
        <UseIntersectionObserver />
        <Divider my="jumbo" />
        <UseInterval />
        <Divider my="jumbo" />
        <UseMeasure />
        <Divider my="jumbo" />
        <UseMediaQuery />
        <Divider my="jumbo" />
        <UseResponsive />
        <Divider my="jumbo" />
        <UseResizeObserver />
        <Divider my="jumbo" />
        <UseTimeout />
        <Divider my="jumbo" />
        <UseWindowSize />
      </div>
    </Page>
  );
}
