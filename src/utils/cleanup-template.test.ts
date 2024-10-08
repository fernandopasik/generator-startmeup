/* eslint-disable @typescript-eslint/no-unnecessary-template-expression */
import cleanupTemplate from './cleanup-template.js';

describe('removeTemplateComments', () => {
  it('handle empty content', () => {
    expect(cleanupTemplate()).toBe('');
    expect(cleanupTemplate('')).toBe('');
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

  it('removes triple comments without new line', () => {
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

  it('removes the remaining sh empty comments', () => {
    const content = `
  #
# valid comment
#
ls -la
`;
    const sanitized = `
# valid comment
ls -la
`;
    expect(cleanupTemplate(content)).toBe(sanitized);
  });
});
