import loadPrettierConfig from '../load-prettier-config';

describe('load prettier config', () => {
  it('can load a default config if none is present', async () => {
    expect(await loadPrettierConfig()).toMatchInlineSnapshot(`
      Object {
        "arrowParens": "always",
        "printWidth": 100,
        "singleQuote": true,
        "trailingComma": "all",
      }
    `);
  });
});
