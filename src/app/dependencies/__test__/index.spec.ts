import { add, addDev, clearAll, get, getDev, has } from '../index';

describe('Dependencies', () => {
  test('add', () => {
    expect(add).toBeInstanceOf(Function);
  });

  test('addDev', () => {
    expect(addDev).toBeInstanceOf(Function);
  });

  test('clearAll', () => {
    expect(clearAll).toBeInstanceOf(Function);
  });

  test('get', () => {
    expect(get).toBeInstanceOf(Function);
  });

  test('getDev', () => {
    expect(getDev).toBeInstanceOf(Function);
  });

  test('has', () => {
    expect(has).toBeInstanceOf(Function);
  });
});
