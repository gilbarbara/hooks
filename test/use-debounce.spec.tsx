import * as React from 'react';
import { act, fireEvent, render } from '@testing-library/react';

import useDebounce from '../src/use-debounce';

jest.useFakeTimers();

describe('useDebounce', () => {
  const mockSearch = jest.fn();

  const Component = () => {
    const [search, setSearch] = React.useState('');
    const debouncedSearch = useDebounce(search, 500);

    React.useEffect(
      () => {
        if (debouncedSearch) {
          mockSearch(debouncedSearch);
        }
      },
      [debouncedSearch], // Only call effect if debounced search term changes
    );

    return (
      <div>
        <input type="text" onChange={e => setSearch(e.target.value)} />
      </div>
    );
  };
  const { getByRole } = render(<Component />);

  it('should debounce the callback', () => {
    fireEvent.change(getByRole('textbox'), { target: { value: 'test' } });

    expect(mockSearch).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(mockSearch).toHaveBeenCalledWith('test');
  });
});
