import * as ask from '../index';

describe('Ask', () => {
  test('default', () => {
    expect(ask.default).toBeInstanceOf(Function);
  });
});
