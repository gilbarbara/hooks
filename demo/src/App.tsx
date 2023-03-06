import './styles.css';

import { Divider, H1, Page } from '@gilbarbara/components';

import UseClickOutside from './components/UseClickOutside';
import UseElementSize from './components/UseElementSize';
import UseIntersectionObserver from './components/UseIntersectionObserver';
import UseMediaQuery from './components/UseMediaQuery';
import UseResizeObserver from './components/UseResizeObserver';
import UseResponsive from './components/UseResponsive';
import UseWindowSize from './components/UseWindowSize';

export default function Hooks(): JSX.Element {
  return (
    <Page align="center">
      <H1>@gilbarbara/hooks</H1>
      <div>
        <UseElementSize />
        <Divider my="jumbo" />
        <UseWindowSize />
        <Divider my="jumbo" />
        <UseMediaQuery />
        <Divider my="jumbo" />
        <UseResponsive />
        <Divider my="jumbo" />
        <UseClickOutside />
        <Divider my="jumbo" />
        <UseResizeObserver />
        <Divider my="jumbo" />
        <UseIntersectionObserver />
      </div>
    </Page>
  );
}
