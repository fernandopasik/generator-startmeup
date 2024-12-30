import hasExtension from './has-extension.ts';

describe('hasExtension', () => {
  it('detects the right extension', () => {
    expect(hasExtension('asdf.json', 'json')).toBe(true);
  });

  it('detects the wrong extension', () => {
    expect(hasExtension('asdf.json', 'js')).toBe(false);
  });

  it('only detects final extensions', () => {
    expect(hasExtension('asdf.js.json', 'js')).toBe(false);
    expect(hasExtension('asdf.test.js', 'js')).toBe(true);
  });
});
