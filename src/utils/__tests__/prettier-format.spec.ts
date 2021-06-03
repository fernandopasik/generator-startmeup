import prettier from 'prettier';
import prettierFormat from '../prettier-format';

jest.mock('prettier', () => ({
  resolveConfig: jest.fn().mockResolvedValue({ printWidth: 130 }),
  format: jest.fn(),
}));

describe('prettierFormat', () => {
  describe('resolves config', () => {
    it('with the provided root path', async () => {
      const root = '/my-test';
      await prettierFormat('', 'example.js', root);
      expect(prettier.resolveConfig).toHaveBeenCalledWith(root);
    });

    it('only one time', async () => {
      await prettierFormat('', 'example.js', '/');
      expect(prettier.resolveConfig).toHaveBeenCalledTimes(1);
      await prettierFormat('', 'example.js', '/');
      expect(prettier.resolveConfig).toHaveBeenCalledTimes(1);
    });
  });

  it('formats the file content', async () => {
    const content = '{ "foo": "bar" }';
    await prettierFormat(content, 'example.json', '/');
    expect(prettier.format).toHaveBeenCalledWith(content, expect.anything());
  });

  describe('sets in options', () => {
    it('the filepath', async () => {
      const filepath = 'example.json';
      await prettierFormat('', filepath, '/');
      expect(prettier.format).toHaveBeenCalledWith('', expect.objectContaining({ filepath }));
    });

    it('the resolved config', async () => {
      await prettierFormat('', 'example.js', '/');
      expect(prettier.format).toHaveBeenCalledWith(
        '',
        expect.objectContaining({ printWidth: 130 }),
      );
    });
  });
});
