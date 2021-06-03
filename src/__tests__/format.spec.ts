import prettier from 'prettier';
import { hasExtension, prettierFormat, removeTemplateComments } from '../format';

jest.mock('prettier', () => ({
  resolveConfig: jest.fn().mockResolvedValue({ printWidth: 130 }),
  format: jest.fn(),
}));

describe('format', () => {
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

  describe('removeTemplateComments', () => {
    it('handle empty content', () => {
      expect(removeTemplateComments()).toStrictEqual('');
      expect(removeTemplateComments('')).toStrictEqual('');
    });

    it('removes the remaining empty comments', () => {
      const content = `
{
  //
  foo: 'bar'
}
`;
      const sanitized = `
{
  foo: 'bar'
}
`;

      expect(removeTemplateComments(content)).toBe(sanitized);
    });

    it('removes the empty comments with trailing spaces', () => {
      const content = `
{
  //${'  '}
  foo: 'bar'
}
`;
      const sanitized = `
{
  foo: 'bar'
}
`;
      expect(removeTemplateComments(content)).toBe(sanitized);
    });

    it('removes tripple comments without new line', () => {
      const content = `
{
  foo: [
    ///'bar',
    ///"bar2"
  ]
}
`;
      const sanitized = `
{
  foo: [
    'bar',
    "bar2"
  ]
}
`;

      expect(removeTemplateComments(content)).toBe(sanitized);
    });

    it('does not remove non empty comments', () => {
      const content = `
{
  // this should not stay
  foo: 'bar' // this should not stay
}
`;
      const sanitized = `
{
  // this should not stay
  foo: 'bar' // this should not stay
}
`;

      expect(removeTemplateComments(content)).toBe(sanitized);
    });
  });

  describe('hasExtension', () => {
    it('detects the right extension', () => {
      expect(hasExtension('asdf.json', 'json')).toBe(true);
    });

    it('detects the wrong extension', () => {
      expect(hasExtension('asdf.json', 'js')).toBe(false);
    });

    it('only detects final extensions', () => {
      expect(hasExtension('asdf.js.json', 'js')).toBe(false);
      expect(hasExtension('asdf.spec.js', 'js')).toBe(true);
    });
  });
});
