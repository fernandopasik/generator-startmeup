import cleanupTemplate from '../cleanup-template';

describe('removeTemplateComments', () => {
  it('handle empty content', () => {
    expect(cleanupTemplate()).toStrictEqual('');
    expect(cleanupTemplate('')).toStrictEqual('');
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

    expect(cleanupTemplate(content)).toBe(sanitized);
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
    expect(cleanupTemplate(content)).toBe(sanitized);
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

    expect(cleanupTemplate(content)).toBe(sanitized);
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

    expect(cleanupTemplate(content)).toBe(sanitized);
  });
});
