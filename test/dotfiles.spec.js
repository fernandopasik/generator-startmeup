'use strict';

const
  path = require('path'),
  genDir = path.join(__dirname, '../generators/app'),
  tmpDir = path.join(__dirname, '../.tmp'),
  helpers = require('yeoman-test'),
  assert = require('yeoman-assert'),

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
    gen = helpers
      .run(genDir)
      .inDir(tmpDir)
      .withOptions({ 'skip-install': true });
  });

  it('creates expected files', done => {

    gen.on('end', () => {
      assert.file(expectedFiles);
      done();
    });
  });

});
