import cleanupTemplate from './cleanup-template.ts';
import formatJson from './format-json.ts';
import format from './format.ts';
import hasExtension from './has-extension.ts';
import prettierFormat from './prettier-format.ts';

jest.mock('./cleanup-template.js', () => jest.fn());
jest.mock('./format-json.js', () => jest.fn());
jest.mock('./has-extension.js', () => jest.fn());
jest.mock('./prettier-format.js', () => jest.fn());

describe('format', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('cleans up to template code', async () => {
    const content = '{"foo": "bar","foo2":"bar2"}';
    await format(content, '', '');

    expect(cleanupTemplate).toHaveBeenCalledTimes(1);
    expect(cleanupTemplate).toHaveBeenCalledWith(content);
  });

  it('formats with prettier', async () => {
    const content1 = '{"foo": "bar",//"foo2":"bar2"}';
    const content2 = '{"foo": "bar","foo2":"bar2"}';
    const filepath = 'example.ts';
    const root = '/';
    (cleanupTemplate as jest.MockedFunction<typeof cleanupTemplate>).mockReturnValueOnce(content1);
    (prettierFormat as jest.MockedFunction<typeof prettierFormat>).mockResolvedValueOnce(content2);
    const result = await format(content1, filepath, root);

    expect(prettierFormat).toHaveBeenCalledTimes(1);
    expect(prettierFormat).toHaveBeenCalledWith(content1, filepath, root);
    expect(result).toStrictEqual(content2);
  });

  it('returns formatted file', async () => {
    const formatted = '{"foo": "bar"}';
    (prettierFormat as jest.MockedFunction<typeof prettierFormat>).mockResolvedValueOnce(formatted);
    const result = await format('', '', '');

    expect(result).toStrictEqual(formatted);
  });

  it('runs extra format to json files', async () => {
    (hasExtension as jest.MockedFunction<typeof hasExtension>).mockReturnValueOnce(false);
    await format('', '', '');

    expect(hasExtension).toHaveBeenCalledTimes(1);
    expect(formatJson).toHaveBeenCalledTimes(0);

    (hasExtension as jest.MockedFunction<typeof hasExtension>).mockReturnValueOnce(true);
    await format('', '', '');

    expect(hasExtension).toHaveBeenCalledTimes(2);
    expect(formatJson).toHaveBeenCalledTimes(1);
  });
});
