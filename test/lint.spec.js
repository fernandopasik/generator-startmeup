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

  var gen;

  beforeEach( function () {
    gen = helpers
      .run(genDir)
      .inDir(tmpDir)
      .withOptions({ 'skip-install': true });
  });

  it('creates dotfiles', function (done) {

    var expected = [
      '.jscsrc',
      '.jshintignore',
      '.jshintrc'
    ];

    gen.on('end', function () {
      assert.file(expected);
      assert.fileContent('package.json', new RegExp('jshint.*' + escapeStringRegexp(pkg.devDependencies.jshint)));
      assert.fileContent('package.json', new RegExp('jscs.*' + escapeStringRegexp(pkg.devDependencies.jscs)));
      done();
    });
  });

  it('checks for dependencies', function (done) {

    var
      jshint = new RegExp('jshint.*' + escapeStringRegexp(pkg.devDependencies.jshint)),
      jscs = new RegExp('jshint.*' + escapeStringRegexp(pkg.devDependencies.jshint));

    gen.on('end', function () {
      assert.fileContent('package.json', jshint);
      assert.fileContent('package.json', jscs);
      done();
    });
  });

});
