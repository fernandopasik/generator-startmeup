'use strict';

const
  path = require('path'),
  escapeStringRegexp = require('escape-string-regexp'),
  genDir = path.join(__dirname, '../generators/app'),
  tmpDir = path.join(__dirname, '../.tmp'),
  pkg = require(path.join(__dirname, '../package.json')),
  helpers = require('yeoman-test'),
  assert = require('yeoman-assert'),
  expectedFiles = [
    '.jscsrc',
    '.jshintignore',
    '.jshintrc'
  ],
  jshint = new RegExp(`jshint.*${escapeStringRegexp(pkg.devDependencies.jshint)}`),
  jscs = new RegExp(`jscs.*${escapeStringRegexp(pkg.devDependencies.jscs)}`);

describe('Linting install', () => {

  let gen;

  beforeEach(() => {
    gen = helpers
      .run(genDir)
      .inDir(tmpDir)
      .withOptions({ 'skip-install': true });
  });

  it('creates dotfiles', done => {

    gen.on('end', () => {
      assert.file(expectedFiles);
      done();
    });
  });

  it('checks for dependencies', done => {

    gen.on('end', () => {
      assert.fileContent('package.json', jshint);
      assert.fileContent('package.json', jscs);
      done();
    });
  });

  it('can be disabled', done => {
    gen
      .withPrompts({ modules: [] })
      .on('end', () => {
        assert.noFile(expectedFiles);
        assert.noFileContent('package.json', jshint);
        assert.noFileContent('package.json', jscs);
        done();
      });
  });

});
