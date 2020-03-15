import { mocked } from 'ts-jest/utils';
import currentPath from '../current-path';
import currentDir from '../current-dir';

jest.mock('../current-dir', () => jest.fn());

describe('current path', () => {
  it('joins current directory with filename', () => {
    const dir = '/asdf';
    mocked(currentDir).mockReturnValueOnce(dir);
    expect(currentPath('example.js')).toStrictEqual(`${dir}/example.js`);
  });

  it('returns only current directory when no filename', () => {
    const dir = '/asdf';
    mocked(currentDir).mockReturnValueOnce(dir);
    expect(currentPath()).toStrictEqual(dir);
  });
});
