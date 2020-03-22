import { add, clear, get, has, importAll, remove } from '../index';

describe('dependencies', () => {
  it('has the right exports', () => {
    expect(add).toBeInstanceOf(Function);
    expect(clear).toBeInstanceOf(Function);
    expect(get).toBeInstanceOf(Function);
    expect(has).toBeInstanceOf(Function);
    expect(importAll).toBeInstanceOf(Function);
    expect(remove).toBeInstanceOf(Function);
  });
});
