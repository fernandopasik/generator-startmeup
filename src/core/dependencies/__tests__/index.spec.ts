import { add, clear, get, has, importFrom, remove } from '../index';

describe('dependencies', () => {
  it('has the right exports', () => {
    expect(add).toBeInstanceOf(Function);
    expect(clear).toBeInstanceOf(Function);
    expect(get).toBeInstanceOf(Function);
    expect(has).toBeInstanceOf(Function);
    expect(importFrom).toBeInstanceOf(Function);
    expect(remove).toBeInstanceOf(Function);
  });
});
