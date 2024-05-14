import { act, renderHook } from '@testing-library/react';

import { useScript } from '../src/useScript';

describe('useScript', () => {
  afterEach(() => {
    const script = document.body.querySelector('script');

    if (script) {
      script.remove();
    }
  });

  it('should insert the script and load', async () => {
    const { result } = renderHook(() =>
      useScript('https://maps.googleapis.com/maps/api/js?key=Ab2S23Bd&callback=initMap'),
    );
    // const { container } = render(<Component />);
    const script = document.body.querySelector('script');

    expect(script).toHaveAttribute(
      'src',
      'https://maps.googleapis.com/maps/api/js?key=Ab2S23Bd&callback=initMap',
    );

    act(() => {
      script?.dispatchEvent(new Event('load'));
    });

    expect(result.current[0]).toBe(true);
    expect(result.current[1]).toBe(false);
  });

  it('should insert the script and fail', async () => {
    const { result } = renderHook(() =>
      useScript('https://maps.googleapis.com/maps/api/js?key=Ab2S23Bd&callback=initMap'),
    );
    const script = document.body.querySelector('script');

    expect(script).toHaveAttribute(
      'src',
      'https://maps.googleapis.com/maps/api/js?key=Ab2S23Bd&callback=initMap',
    );

    act(() => {
      script?.dispatchEvent(new Event('error'));
    });

    expect(result.current[0]).toBe(false);
    expect(result.current[1]).toBe(true);
  });
});
