import assert from 'node:assert';
import { describe, it } from 'node:test';
import cleanupTemplate from './cleanup-template.ts';

describe('removeTemplateComments', () => {
  it('handle empty content', () => {
    assert.equal(cleanupTemplate(), '');
    assert.equal(cleanupTemplate(''), '');
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

    assert.equal(cleanupTemplate(content), sanitized);
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
    assert.equal(cleanupTemplate(content), sanitized);
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

    assert.equal(cleanupTemplate(content), sanitized);
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

    assert.equal(cleanupTemplate(content), sanitized);
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
    assert.equal(cleanupTemplate(content), sanitized);
  });
});
