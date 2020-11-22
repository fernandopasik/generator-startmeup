import { resolveConfig } from 'prettier';
import { mocked } from 'ts-jest/utils';
import loadPrettierConfig, { clearPrettierConfig } from '../load-prettier-config';

jest.mock('prettier', () => ({
  resolveConfig: jest.fn(),
}));

describe('load prettier config', () => {
  it('default config if none is present', async () => {
    mocked(resolveConfig).mockResolvedValueOnce(null);

    expect(await loadPrettierConfig()).toMatchInlineSnapshot(`
      Object {
        "arrowParens": "always",
        "printWidth": 100,
        "singleQuote": true,
        "trailingComma": "all",
      }
    `);

    clearPrettierConfig();
  });

  it('an existing config', async () => {
    const config = {
      printWidth: 100,
    };
    mocked(resolveConfig).mockResolvedValueOnce(config);

    expect(await loadPrettierConfig()).toStrictEqual(config);

    clearPrettierConfig();
  });

  it('when already loaded', async () => {
    const config1 = {
      printWidth: 100,
    };

    mocked(resolveConfig).mockResolvedValueOnce(config1);

    expect(await loadPrettierConfig()).toStrictEqual(config1);

    const config2 = {
      printWidth: 100,
    };

    mocked(resolveConfig).mockResolvedValueOnce(config2);

    expect(await loadPrettierConfig()).toStrictEqual(config1);

    clearPrettierConfig();
  });
});
