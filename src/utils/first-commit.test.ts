import assert from 'node:assert';
import { describe, it, mock } from 'node:test';
import shell from 'shelljs';
import firstCommit from './first-commit.ts';

const example = `
commit 1234
Author: Me
Date: 1/1/1
`;

describe('first commit', () => {
  it('uses git log', () => {
    const spy = mock.method(shell, 'exec', () => ({ stdout: '' }));
    firstCommit();

    assert.equal(spy.mock.callCount(), 1);
    assert(Boolean(spy.mock.calls[0]?.arguments[0]?.startsWith('git log')));

    spy.mock.restore();
  });

  it('parses the hash', () => {
    const spy = mock.method(shell, 'exec', () => ({ stdout: example }));
    const commit = firstCommit();

    assert.notEqual(commit, null);
    assert.equal(commit?.hash, '1234');

    spy.mock.restore();
  });

  it('parses the author name', () => {
    const spy = mock.method(shell, 'exec', () => ({ stdout: example }));
    const commit = firstCommit();

    assert.notEqual(commit, null);
    assert.equal(commit?.author, 'Me');

    spy.mock.restore();
  });

  it('parses the commit date', () => {
    const spy = mock.method(shell, 'exec', () => ({ stdout: example }));
    const commit = firstCommit();

    assert.notEqual(commit, null);
    assert.equal(commit?.date, '1/1/1');

    spy.mock.restore();
  });

  it('can be have no commits', () => {
    const spy = mock.method(shell, 'exec', () => ({ stdout: '' }));
    const commit = firstCommit();

    assert.equal(commit, null);

    spy.mock.restore();
  });
});
