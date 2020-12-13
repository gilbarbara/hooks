import { useScript, useThrottle, useThrottleValue, useWhyDidYouUpdate } from '../src';

describe('@gilbarbara/hooks', () => {
  it('should have all exports', () => {
    expect(useScript).toEqual(expect.any(Function));
    expect(useThrottle).toEqual(expect.any(Function));
    expect(useThrottleValue).toEqual(expect.any(Function));
    expect(useWhyDidYouUpdate).toEqual(expect.any(Function));
  });
});
