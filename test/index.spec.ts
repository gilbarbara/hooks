import { useFetch, useScript, useThrottle, useThrottleValue, useWhyDidYouUpdate } from '../src';

describe('hooks', () => {
  it('should have all exports', () => {
    expect(useFetch).toEqual(expect.any(Function));
    expect(useScript).toEqual(expect.any(Function));
    expect(useThrottle).toEqual(expect.any(Function));
    expect(useThrottleValue).toEqual(expect.any(Function));
    expect(useWhyDidYouUpdate).toEqual(expect.any(Function));
  });
});
