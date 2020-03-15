import currentDir from '../current-dir';

describe('current dir', () => {
  it('returns the process current working dir', () => {
    expect(currentDir()).toStrictEqual(`${process.cwd()}`);
  });
});
