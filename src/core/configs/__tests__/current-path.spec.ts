import currentPath from '../current-path';

describe('current path', () => {
  it('joins current directory with filename', () => {
    expect(currentPath('example.js')).toStrictEqual(`${process.cwd()}/example.js`);
  });

  it('returns only current directory when no filename', () => {
    expect(currentPath()).toStrictEqual(`${process.cwd()}`);
  });
});
