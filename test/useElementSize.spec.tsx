/* eslint-disable class-methods-use-this */
import * as React from 'react';
import { act, render, screen } from '@testing-library/react';

import { useElementSize } from '../src/useElementSize';

const observe = jest.fn();
const disconnect = jest.fn();

function Component() {
  const rect = useElementSize('.test');

  return (
    <div className="test" data-testid="element">
      {JSON.stringify(rect, undefined, 2)}
    </div>
  );
}

describe('useElementSize', () => {
  let listener: ((rect: any) => void) | undefined;

  beforeEach(() => {
    (window as any).ResizeObserver = class ResizeObserver {
      constructor(entries: any) {
        listener = entries;
      }

      observe(element: Element) {
        observe(element);
      }

      disconnect() {
        disconnect();
      }
    };
  });

  it('should return the measurements', () => {
    render(<Component />);

    expect(screen.getByTestId('element')).toMatchSnapshot('before');

    act(() => {
      listener?.([
        {
          contentRect: {
            x: 1,
            y: 1,
            width: 1,
            height: 1,
            top: 1,
            bottom: 1,
            left: 1,
            right: 1,
          },
        },
      ]);
    });

    expect(screen.getByTestId('element')).toMatchSnapshot('after');
  });
});
