'use strict';

const helpers = require('../helpers'),

  // Add files you expect to exist here.
  expectedFiles = [
    '.editorconfig',
    '.gitattributes',
    '.gitignore'
  ];

describe('dotfiles Creation', () => {

  let gen;

  beforeEach(() => {
    gen = helpers.generator();
  });

  it('creates expected files', done => {

    gen.on('end', () => {
      try {
        assert.file(expectedFiles);
        done();
      } catch (e) {
        done(e);
      }
    });
  });

});
