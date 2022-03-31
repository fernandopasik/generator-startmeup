import { jest } from '@jest/globals';
import prettier from 'prettier';
import prettierFormat from '../prettier-format.js';

describe('prettierFormat', () => {
  describe('resolves config', () => {
    it('with the provided root path', async () => {
      const spy = jest.spyOn(prettier, 'resolveConfig');
      const root = '/my-test';
      await prettierFormat('', 'example.js', root);
      expect(spy).toHaveBeenCalledWith(root);
      spy.mockRestore();
    });

    it('formats the file content', async () => {
      const spy = jest.spyOn(prettier, 'format');
      const content = '{ "foo": "bar" }';
      await prettierFormat(content, 'example.json', '/');
      expect(spy).toHaveBeenCalledWith(content, expect.anything());
      spy.mockRestore();
    });
  });

  describe('sets in options', () => {
    it('the filepath', async () => {
      const spy = jest.spyOn(prettier, 'format');
      const filepath = 'example.json';
      await prettierFormat('', filepath, '/');
      expect(spy).toHaveBeenCalledWith('', expect.objectContaining({ filepath }));
      spy.mockRestore();
    });

    it('the resolved config', async () => {
      const spy1 = jest.spyOn(prettier, 'resolveConfig').mockResolvedValue({ printWidth: 130 });
      const spy2 = jest.spyOn(prettier, 'format');
      await prettierFormat('', 'example.js', '/');
      expect(spy2).toHaveBeenCalledWith('', expect.objectContaining({ printWidth: 130 }));
      spy1.mockRestore();
      spy2.mockRestore();
    });
  });
});
