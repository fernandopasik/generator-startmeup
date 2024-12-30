import assert from 'node:assert';
import { describe, it, mock } from 'node:test';
import shell from 'shelljs';
import gitMainBranch from './git-main-branch.ts';

describe('first commit', () => {
  it('uses git log', () => {
    const branchName = 'different';
    const spy = mock.method(shell, 'exec', () => ({ stdout: branchName }));

    const mainBranch = gitMainBranch();

    assert.equal(spy.mock.callCount(), 1);
    assert(Boolean(spy.mock.calls[0]?.arguments[0]?.startsWith('git symbolic-ref')));
    assert.equal(mainBranch, branchName);

    spy.mock.restore();
  });
});
