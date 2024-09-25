import shell from 'shelljs';
import firstCommit from './first-commit.js';

const example = `
commit 1234
Author: Me
Date: 1/1/1
`;

describe('first commit', () => {
  it('uses git log', () => {
    // @ts-expect-error readable
    const spy = jest.spyOn(shell, 'exec').mockReturnValueOnce({ stdout: '' });
    firstCommit();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('git log'), expect.anything());

    spy.mockRestore();
  });

  it('parses the hash', () => {
    // @ts-expect-error readable
    const spy = jest.spyOn(shell, 'exec').mockReturnValueOnce({ stdout: example });
    const commit = firstCommit();

    expect(commit).not.toBeNull();
    expect(commit?.hash).toBe('1234');

    spy.mockRestore();
  });

  it('parses the author name', () => {
    // @ts-expect-error readable
    const spy = jest.spyOn(shell, 'exec').mockReturnValueOnce({ stdout: example });
    const commit = firstCommit();

    expect(commit).not.toBeNull();
    expect(commit?.author).toBe('Me');

    spy.mockRestore();
  });

  it('parses the commit date', () => {
    // @ts-expect-error readable
    const spy = jest.spyOn(shell, 'exec').mockReturnValueOnce({ stdout: example });
    const commit = firstCommit();

    expect(commit).not.toBeNull();
    expect(commit?.date).toBe('1/1/1');

    spy.mockRestore();
  });

  it('can be have no commits', () => {
    // @ts-expect-error readable
    const spy = jest.spyOn(shell, 'exec').mockReturnValueOnce({ stdout: '' });
    const commit = firstCommit();

    expect(commit).toBeNull();

    spy.mockRestore();
  });
});
