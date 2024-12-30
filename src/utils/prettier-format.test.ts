import { format, resolveConfig, resolveConfigFile } from 'prettier';
import prettierFormat from './prettier-format.ts';

jest.mock('prettier', () => ({
  format: jest.fn(),
  resolveConfig: jest.fn(),
  resolveConfigFile: jest.fn(),
}));

describe('prettierFormat', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('resolves config', () => {
    it('with the provided root path', async () => {
      const root = '/my-test';
      await prettierFormat('', 'example.js', root);
      expect(resolveConfigFile).toHaveBeenCalledWith(`${root}/example.js`);
    });

    it('formats the file content', async () => {
      const content = '{ "foo": "bar" }';
      await prettierFormat(content, 'example.json', '/');
      expect(format).toHaveBeenCalledWith(content, expect.anything());
    });
  });

  describe('sets in options', () => {
    it('the filepath', async () => {
      const filepath = 'example.json';
      await prettierFormat('', filepath, '/');
      expect(format).toHaveBeenCalledWith('', expect.objectContaining({ filepath }));
    });

    it('the resolved config', async () => {
      (resolveConfigFile as jest.MockedFunction<typeof resolveConfigFile>).mockResolvedValueOnce(
        '.prettierrc.json',
      );
      (resolveConfig as jest.MockedFunction<typeof resolveConfig>).mockResolvedValueOnce({
        printWidth: 130,
      });
      await prettierFormat('', 'example.js', '/');
      expect(format).toHaveBeenCalledWith('', expect.objectContaining({ printWidth: 130 }));
    });
  });
});
