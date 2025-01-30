import { Button, Paragraph, Spacer } from '@gilbarbara/components';
import { useDataChanges, useSetState } from '@gilbarbara/hooks';

import Block from '../components/Block';
import BorderBox from '../components/BorderBox';
import Code from '../components/Code';
import Heading from '../components/Heading';

export default function UseDataChanges() {
  const [state, setState] = useSetState<Record<string, any>>({
    propA: 1,
    propB: 2,
  });

  const changes = useDataChanges(state, 'UseDataChanges');

  return (
    <Block>
      <Heading>useDataChanges</Heading>
      <BorderBox maxWidth={400}>
        <Code bold data={changes} mb="md" />
        <Spacer distribution="center">
          <Button onClick={() => setState({ propA: state.propA + 1 })} size="sm">
            Change Prop A
          </Button>
          <Button
            onClick={() => setState({ propA: state.propA + 1, propB: state.propB + 1 })}
            size="sm"
          >
            Change Both
          </Button>
        </Spacer>
        <Paragraph italic mt="sm" size="sm">
          The changes are also logged in the console.
        </Paragraph>
      </BorderBox>
    </Block>
  );
}
