import assert from 'node:assert';
import { after, beforeEach, describe, it, mock } from 'node:test';
import type cleanupTemplate from './cleanup-template.ts';
import type formatJson from './format-json.ts';
import type hasExtension from './has-extension.ts';
import type prettierFormat from './prettier-format.ts';

describe('format', () => {
  const cleanupTemplateMock = mock.fn<typeof cleanupTemplate>();
  const formatJsonMock = mock.fn<typeof formatJson>();
  const hasExtensionMock = mock.fn<typeof hasExtension>();
  const prettierFormatMock = mock.fn<typeof prettierFormat>();
  const module1 = mock.module('./cleanup-template.ts', { defaultExport: cleanupTemplateMock });
  const module2 = mock.module('./format-json.ts', { defaultExport: formatJsonMock });
  const module3 = mock.module('./has-extension.ts', { defaultExport: hasExtensionMock });
  const module4 = mock.module('./prettier-format.ts', { defaultExport: prettierFormatMock });

  beforeEach(() => {
    cleanupTemplateMock.mock.resetCalls();
    formatJsonMock.mock.resetCalls();
    hasExtensionMock.mock.resetCalls();
    prettierFormatMock.mock.resetCalls();
  });

  after(() => {
    module1.restore();
    module2.restore();
    module3.restore();
    module4.restore();
  });

  it('cleans up to template code', async () => {
    const { default: format } = await import('./format.ts');
    const content = '{"foo": "bar","foo2":"bar2"}';
    await format(content, '', '');

    assert.equal(cleanupTemplateMock.mock.callCount(), 1);
    assert.equal(cleanupTemplateMock.mock.calls[0]?.arguments[0], content);
  });

  it('formats with prettier', async () => {
    const { default: format } = await import('./format.ts');
    const content1 = '{"foo": "bar",//"foo2":"bar2"}';
    const content2 = '{"foo": "bar","foo2":"bar2"}';
    const filepath = 'example.ts';
    const root = '/';
    cleanupTemplateMock.mock.mockImplementationOnce(() => content1);
    prettierFormatMock.mock.mockImplementationOnce(async () => Promise.resolve(content2));

    const result = await format(content1, filepath, root);

    assert.equal(prettierFormatMock.mock.callCount(), 1);
    assert.deepStrictEqual(prettierFormatMock.mock.calls[0]?.arguments, [content1, filepath, root]);
    assert.deepStrictEqual(result, content2);
  });

  it('returns formatted file', async () => {
    const { default: format } = await import('./format.ts');
    const formatted = '{"foo": "bar"}';
    prettierFormatMock.mock.mockImplementationOnce(async () => Promise.resolve(formatted));
    const result = await format('', '', '');

    assert.deepStrictEqual(result, formatted);
  });

  it('runs extra format to json files', async () => {
    const { default: format } = await import('./format.ts');
    hasExtensionMock.mock.mockImplementationOnce(() => false);
    await format('', '', '');

    assert.equal(hasExtensionMock.mock.callCount(), 1);
    assert.equal(formatJsonMock.mock.callCount(), 0);

    hasExtensionMock.mock.mockImplementationOnce(() => true);
    await format('', '', '');

    assert.equal(hasExtensionMock.mock.callCount(), 2);
    assert.equal(formatJsonMock.mock.callCount(), 1);
  });
});
