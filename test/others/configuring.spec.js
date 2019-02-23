const helpers = require('../helpers');
// Add files you expect to exist here.
const expectedFiles = [
  '.editorconfig',
  '.gitattributes',
  '.gitignore',
];

describe('dotfiles Creation', () => {
  let gen;

  before(() => {
    gen = helpers.generator().toPromise();
  });

  it('creates expected files', () => gen.then(() => {
    assert.file(expectedFiles);
  }));
});
