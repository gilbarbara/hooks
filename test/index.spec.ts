import * as hooks from '../src';

describe('@gilbarbara/hooks', () => {
  it('should have all exports', () => {
    expect(Object.keys(hooks)).toMatchSnapshot();
  });
});
