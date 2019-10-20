import * as dependencies from '../index';

describe('Dependencies', () => {
  it('add', () => {
    expect(dependencies.add).toBeInstanceOf(Function);
  });

  it('addDev', () => {
    expect(dependencies.addDev).toBeInstanceOf(Function);
  });

  it('clearAll', () => {
    expect(dependencies.clearAll).toBeInstanceOf(Function);
  });

  it('get', () => {
    expect(dependencies.get).toBeInstanceOf(Function);
  });

  it('getDev', () => {
    expect(dependencies.getDev).toBeInstanceOf(Function);
  });

  it('has', () => {
    expect(dependencies.has).toBeInstanceOf(Function);
  });
});
