import { format, resolveConfig } from 'prettier';
import prettierFormat from '../prettier-format.js';

jest.mock('prettier', () => ({
  format: jest.fn(),
  resolveConfig: jest.fn(),
}));

describe('prettierFormat', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('resolves config', () => {
    it('with the provided root path', async () => {
      const root = '/my-test';
      await prettierFormat('', 'example.js', root);
      expect(resolveConfig).toHaveBeenCalledWith(root);
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
      (resolveConfig as jest.MockedFunction<typeof resolveConfig>).mockResolvedValueOnce({
        printWidth: 130,
      });
      await prettierFormat('', 'example.js', '/');
      expect(format).toHaveBeenCalledWith('', expect.objectContaining({ printWidth: 130 }));
    });
  });
});
