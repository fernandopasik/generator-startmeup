import prettier from 'prettier';
import * as configs from '../configs';

const { currentPath, fileExists, loadPrettierConfig, format } = configs;

describe('configs', () => {
  describe('current path', () => {
    it('joins current directory with filename', () => {
      expect(currentPath('example.js')).toStrictEqual(`${process.cwd()}/example.js`);
    });

    it('returns only current directory when no filename', () => {
      expect(currentPath()).toStrictEqual(`${process.cwd()}`);
    });
  });

  describe('file exists', () => {
    it('returns true when file exists', () => {
      expect(fileExists('package.json')).toBe(true);
    });

    it('returns false when file does not exist', () => {
      expect(fileExists('example.js')).toBe(false);
    });
  });

  describe('load prettier config', () => {
    it('can load a default config if none is present', async () => {
      expect(await loadPrettierConfig()).toMatchInlineSnapshot(`
        Object {
          "arrowParens": "always",
          "printWidth": 80,
          "singleQuote": true,
          "trailingComma": "all",
        }
      `);
    });
  });

  describe('format', () => {
    it('calls prettier', async () => {
      const myConfig = { test: true };
      const spy = jest.spyOn(prettier, 'format');

      await format(JSON.stringify(myConfig));

      expect(spy).toHaveBeenCalledWith(JSON.stringify(myConfig), expect.anything());

      spy.mockRestore();
    });

    it('loads prettier config', async () => {
      const spy = jest.spyOn(configs, 'loadPrettierConfig');

      await format(JSON.stringify({}));

      expect(spy).toHaveBeenCalledTimes(1);

      spy.mockRestore();
    });

    it('can do js', async () => {
      const myConfig = { test: true };
      const content = `module.exports = ${JSON.stringify(myConfig)}`;
      const spy = jest.spyOn(prettier, 'format');

      await format(content, 'js');

      expect(spy).toHaveBeenCalledWith(content, expect.objectContaining({ parser: 'babel' }));

      spy.mockRestore();
    });

    it('can do json', async () => {
      const myConfig = { test: true };
      const spy = jest.spyOn(prettier, 'format');

      await format(JSON.stringify(myConfig), 'json');

      expect(spy).toHaveBeenCalledWith(
        JSON.stringify(myConfig),
        expect.objectContaining({ parser: 'json' }),
      );

      spy.mockRestore();
    });
  });
});
