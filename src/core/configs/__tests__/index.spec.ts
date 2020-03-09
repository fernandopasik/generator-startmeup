import { currentPath, fileExists, format, loadPrettierConfig, load, save } from '../index';

describe('dependencies', () => {
  it('has the right exports', () => {
    expect(currentPath).toBeInstanceOf(Function);
    expect(fileExists).toBeInstanceOf(Function);
    expect(format).toBeInstanceOf(Function);
    expect(loadPrettierConfig).toBeInstanceOf(Function);
    expect(load).toBeInstanceOf(Function);
    expect(save).toBeInstanceOf(Function);
  });
});
