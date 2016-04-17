'use strict';

const
  dirs = require('../helpers').dirs,
  yeomanTest = require('yeoman-test'),

  // Add files you expect to exist here.
  expectedFiles = [
    '.bowerrc',
    '.editorconfig',
    '.gitattributes',
    '.gitignore'
  ];

describe('dotfiles Creation', () => {

  let gen;

  beforeEach(() => {
    gen = yeomanTest
      .run(dirs.generator)
      .inDir(dirs.tmp)
      .withOptions({ skipInstall: true });
  });

  it('creates expected files', done => {

    gen.on('end', () => {
      assert.file(expectedFiles);
      done();
    });
  });

});
