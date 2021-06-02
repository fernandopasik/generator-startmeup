import { removeTemplateComments } from '../format';

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
});
