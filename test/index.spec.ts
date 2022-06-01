import {
  useElementSize,
  useFetch,
  useRenderCount,
  useResponsive,
  useScript,
  useSingleton,
  useThrottle,
  useThrottleValue,
  useWhyDidYouUpdate,
} from '../src';

describe('hooks', () => {
  it('should have all exports', () => {
    expect(useElementSize).toEqual(expect.any(Function));
    expect(useFetch).toEqual(expect.any(Function));
    expect(useRenderCount).toEqual(expect.any(Function));
    expect(useResponsive).toEqual(expect.any(Function));
    expect(useScript).toEqual(expect.any(Function));
    expect(useSingleton).toEqual(expect.any(Function));
    expect(useThrottle).toEqual(expect.any(Function));
    expect(useThrottleValue).toEqual(expect.any(Function));
    expect(useWhyDidYouUpdate).toEqual(expect.any(Function));
  });
});
