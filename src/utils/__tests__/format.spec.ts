import cleanupTemplate from '../cleanup-template';
import format from '../format';
import formatJson from '../format-json';
import hasExtension from '../has-extension';
import prettierFormat from '../prettier-format';

jest.mock('../cleanup-template');
jest.mock('../format-json');
jest.mock('../has-extension');
jest.mock('../prettier-format');

describe('format', () => {
  beforeEach(() => {
    (cleanupTemplate as jest.MockedFunction<typeof cleanupTemplate>).mockClear();
    (formatJson as jest.MockedFunction<typeof formatJson>).mockClear();
    (hasExtension as jest.MockedFunction<typeof hasExtension>).mockClear();
    (prettierFormat as jest.MockedFunction<typeof prettierFormat>).mockClear();
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
    const filepath = 'example.js';
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
