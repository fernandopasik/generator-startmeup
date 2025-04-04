import assert from 'node:assert';
import { after, beforeEach, describe, it, mock } from 'node:test';
import type { JsonObject } from 'type-fest';
import type prettierFormat from './prettier-format.ts';
import type sortProps from './sort-props.ts';

describe('formatJson', () => {
  const prettierFormatMock = mock.fn<typeof prettierFormat>(async (content: string) =>
    Promise.resolve(content),
  );
  const sortPropsMock = mock.fn<typeof sortProps>((json?: JsonObject): JsonObject => json ?? {});
  const module1 = mock.module('./prettier-format.ts', { defaultExport: prettierFormatMock });
  const module2 = mock.module('./sort-props.ts', { defaultExport: sortPropsMock });

  beforeEach(() => {
    sortPropsMock.mock.resetCalls();
    prettierFormatMock.mock.resetCalls();
  });

  after(() => {
    module1.restore();
    module2.restore();
  });

  describe('sorts properties', () => {
    it('once', async () => {
      const { default: formatJson } = await import('./format-json.ts');
      await formatJson('{}', '', '');
      assert.equal(sortPropsMock.mock.callCount(), 1);
    });

    it('with content', async () => {
      const { default: formatJson } = await import('./format-json.ts');
      const json = '{"foo": "bar"}';
      await formatJson(json, '', '');
      assert.deepStrictEqual(sortPropsMock.mock.calls[0]?.arguments[0], JSON.parse(json));
    });

    it('with options', async () => {
      const { default: formatJson } = await import('./format-json.ts');
      await formatJson('{}', '', '');
      assert.deepStrictEqual(sortPropsMock.mock.calls[0]?.arguments[0], {});
      assert.deepStrictEqual(sortPropsMock.mock.calls[0].arguments[1], [
        'extends',
        'files',
        'plugins',
        'error',
      ]);
    });
  });

  describe('runs prettier format', () => {
    it('with filepath', async () => {
      const { default: formatJson } = await import('./format-json.ts');
      const filepath = 'example.json';
      await formatJson('{}', filepath, '');
      assert.equal(prettierFormatMock.mock.calls[0]?.arguments[1], filepath);
    });

    it('with root path', async () => {
      const { default: formatJson } = await import('./format-json.ts');
      const root = '/';
      await formatJson('{}', '', root);
      assert.equal(prettierFormatMock.mock.calls[0]?.arguments[2], root);
    });

    it('with content', async () => {
      const { default: formatJson } = await import('./format-json.ts');
      const content = '{"foo":"bar","foo2":"bar2","foo3":"bar3"}';
      const parsedContent = `{"foo":"bar","foo2":"bar2","foo3":"bar3"}`;
      await formatJson(content, '', '');
      assert.equal(prettierFormatMock.mock.calls[0]?.arguments[0], parsedContent);
    });

    it('with short content', async () => {
      const { default: formatJson } = await import('./format-json.ts');
      const content = '{"foo": "bar","foo2":"bar2"}';
      const parsedContent = `{
  "foo": "bar",
  "foo2": "bar2"
}`;
      await formatJson(content, '', '');
      assert.equal(prettierFormatMock.mock.calls[0]?.arguments[0], parsedContent);
    });
  });
});
