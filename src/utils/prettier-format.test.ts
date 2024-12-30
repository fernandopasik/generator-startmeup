import assert from 'node:assert';
import { after, beforeEach, describe, it, mock } from 'node:test';
import type { format, resolveConfig, resolveConfigFile } from 'prettier';

describe('prettierFormat', () => {
  const formatMock = mock.fn<typeof format>();
  const resolveConfigFileMock = mock.fn<typeof resolveConfigFile>();
  const resolveConfigMock = mock.fn<typeof resolveConfig>();
  const prettierMock = mock.module('prettier', {
    namedExports: {
      format: formatMock,
      resolveConfig: resolveConfigMock,
      resolveConfigFile: resolveConfigFileMock,
    },
  });

  beforeEach(() => {
    formatMock.mock.resetCalls();
    resolveConfigMock.mock.resetCalls();
    resolveConfigFileMock.mock.resetCalls();
  });

  after(() => {
    prettierMock.restore();
  });

  describe('resolves config', () => {
    it('with the provided root path', async () => {
      const { default: prettierFormat } = await import('./prettier-format.ts');
      const root = '/my-test';

      await prettierFormat('', 'example.js', root);
      assert.equal(resolveConfigFileMock.mock.calls[0]?.arguments[0], `${root}/example.js`);

      prettierMock.restore();
    });

    it('formats the file content', async () => {
      const { default: prettierFormat } = await import('./prettier-format.ts');
      const content = '{ "foo": "bar" }';

      await prettierFormat(content, 'example.json', '/');
      assert.equal(formatMock.mock.calls[0]?.arguments[0], content);
    });
  });

  describe('sets in options', () => {
    it('the filepath', async () => {
      const { default: prettierFormat } = await import('./prettier-format.ts');
      const filepath = 'example.json';

      await prettierFormat('', filepath, '/');
      assert.deepStrictEqual(formatMock.mock.calls[0]?.arguments, ['', { filepath }]);
    });

    it('the resolved config', async () => {
      const { default: prettierFormat } = await import('./prettier-format.ts');
      resolveConfigFileMock.mock.mockImplementationOnce(async () =>
        Promise.resolve('.prettierrc.json'),
      );
      resolveConfigMock.mock.mockImplementationOnce(async () =>
        Promise.resolve({ printWidth: 130 }),
      );

      await prettierFormat('', 'example.js', '/');
      assert.deepStrictEqual(formatMock.mock.calls[0]?.arguments, [
        '',
        { filepath: 'example.js', printWidth: 130 },
      ]);
    });
  });
});
