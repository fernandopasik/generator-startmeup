'use strict';

const generator = require('../generator'),

  // Add files you expect to exist here.
  expectedFiles = [
    '.editorconfig',
    '.gitattributes',
    '.gitignore'
  ];

describe('dotfiles Creation', () => {

  let gen;

  beforeEach(() => {
    gen = generator();
  });

  it('creates expected files', done => {

    gen.on('end', () => {
      assert.file(expectedFiles);
      done();
    });
  });

});
