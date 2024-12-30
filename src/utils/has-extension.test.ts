import assert from 'node:assert';
import { describe, it } from 'node:test';
import hasExtension from './has-extension.ts';

describe('hasExtension', () => {
  it('detects the right extension', () => {
    assert.equal(hasExtension('asdf.json', 'json'), true);
  });

  it('detects the wrong extension', () => {
    assert.equal(hasExtension('asdf.json', 'js'), false);
  });

  it('only detects final extensions', () => {
    assert.equal(hasExtension('asdf.js.json', 'js'), false);
    assert.equal(hasExtension('asdf.test.js', 'js'), true);
  });
});
