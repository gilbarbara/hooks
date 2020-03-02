import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';

import useStateMap from '../src/use-state-map';

describe('useStateMap', () => {
  const Component = () => {
    const [options, setOptions] = useStateMap({ data: [], status: 'idle' });

    const handleClick = React.useCallback(() => {
      setOptions({ status: 'running' });
    }, [setOptions]);

    return (
      <div>
        <h1>{JSON.stringify(options, null, 2)}</h1>
        <button type="button" onClick={handleClick}>
          Update
        </button>
      </div>
    );
  };

  const { container } = render(<Component />);

  it('should re-render the id has changed', () => {
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.click(container.querySelector('button')!);

    expect(container.firstChild).toMatchSnapshot();
  });
});
