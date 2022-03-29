import { jest } from '@jest/globals';
import shell from 'shelljs';
import gitMainBranch from '../git-main-branch.js';

describe('first commit', () => {
  it('uses git log', () => {
    const branchName = 'different';
    // @ts-expect-error readable
    const spy = jest.spyOn(shell, 'exec').mockReturnValueOnce({ stdout: branchName });

    const mainBranch = gitMainBranch();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(
      expect.stringContaining('git symbolic-ref'),
      expect.anything(),
    );
    expect(mainBranch).toBe(branchName);

    spy.mockRestore();
  });
});
