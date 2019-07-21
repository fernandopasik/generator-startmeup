import * as dependencies from '../index';

describe('Dependencies', () => {
  test('add', () => {
    expect(dependencies.add).toBeInstanceOf(Function);
  });

  test('addDev', () => {
    expect(dependencies.addDev).toBeInstanceOf(Function);
  });

  test('clearAll', () => {
    expect(dependencies.clearAll).toBeInstanceOf(Function);
  });

  test('get', () => {
    expect(dependencies.get).toBeInstanceOf(Function);
  });

  test('getDev', () => {
    expect(dependencies.getDev).toBeInstanceOf(Function);
  });

  test('has', () => {
    expect(dependencies.has).toBeInstanceOf(Function);
  });
});
