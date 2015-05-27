'use strict';

var
  path = require('path'),
  genDir = path.join(__dirname, '../generators/app'),
  tmpDir = path.join(__dirname, '../.tmp'),
  helpers = require('yeoman-generator').test,
  assert = require('yeoman-generator').assert;

describe('dotfiles Creation', function () {

  var gen;

  beforeEach( function () {
    gen = helpers
      .run(genDir)
      .inDir(tmpDir)
      .withOptions({ 'skip-install': true });
  });

  it('creates expected files', function (done) {

    // Add files you expect to exist here.
    var expected = [
      '.bowerrc',
      '.editorconfig',
      '.gitattributes',
      '.gitignore',
      '.jscsrc',
      '.jshintignore',
      '.jshintrc'
    ];

    gen.on('end', function () {
      assert.file(expected);
      done();
    });
  });

});
