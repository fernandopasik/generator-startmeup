import { hasExtension, removeTemplateComments } from '../format';

describe('format', () => {
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
