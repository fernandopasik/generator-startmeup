'use strict';

var
  path = require('path'),
  escapeStringRegexp = require('escape-string-regexp'),
  genDir = path.join(__dirname, '../generators/app'),
  tmpDir = path.join(__dirname, '../.tmp'),
  pkg = require(path.join(__dirname, '../package.json')),
  helpers = require('yeoman-test'),
  assert = require('yeoman-assert');

describe('Linting install', function () {

  var
    gen,
    expected = [
      '.jscsrc',
      '.jshintignore',
      '.jshintrc'
    ],
    jshint = new RegExp('jshint.*' + escapeStringRegexp(pkg.devDependencies.jshint)),
    jscs = new RegExp('jscs.*' + escapeStringRegexp(pkg.devDependencies.jscs));

  beforeEach( function () {
    gen = helpers
      .run(genDir)
      .inDir(tmpDir)
      .withOptions({ 'skip-install': true });
  });

  it('creates dotfiles', function (done) {

    gen.on('end', function () {
      assert.file(expected);
      done();
    });
  });

  it('checks for dependencies', function (done) {

    gen.on('end', function () {
      assert.fileContent('package.json', jshint);
      assert.fileContent('package.json', jscs);
      done();
    });
  });

  it('can be disabled', function (done) {
    gen
      .withPrompts({ modules: [] })
      .on('end', function () {
        assert.noFile(expected);
        assert.noFileContent('package.json', jshint);
        assert.noFileContent('package.json', jscs);
        done();
      });
  });

});
