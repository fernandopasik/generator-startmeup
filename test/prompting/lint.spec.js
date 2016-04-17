'use strict';

const
  escapeStringRegexp = require('escape-string-regexp'),
  dirs = require('../helpers').dirs,
  pkg = require('../../package.json'),
  yeomanTest = require('yeoman-test'),
  assert = require('yeoman-assert'),
  expectedFiles = [
    '.jscsrc',
    '.jshintignore',
    '.jshintrc',
    '.eslintrc',
    '.eslintignore'
  ],
  jshint = new RegExp(`jshint.*${escapeStringRegexp(pkg.devDependencies.jshint)}`),
  jscs = new RegExp(`jscs.*${escapeStringRegexp(pkg.devDependencies.jscs)}`),
  eslint = new RegExp(`eslint.*${escapeStringRegexp(pkg.devDependencies.eslint)}`),

  // jscs:disable maximumLineLength
  // eslint-disable-next-line max-len
  eslintConfig = new RegExp(`eslint-config-fernandopasik.*${escapeStringRegexp(pkg.devDependencies['eslint-config-fernandopasik'])}`);

describe('Linting', () => {

  let gen, tempGen;

  beforeEach(done => {
    gen = yeomanTest
      .run(dirs.generator)
      .inDir(dirs.tmp)
      .withOptions({ skipInstall: true })
      .on('ready', generator => {
        tempGen = generator;
        done();
      });
  });

  it('Available methods are jshint, jscs and eslint', done => {
    gen
      .withPrompts({ lintMethods: [ 'jshint', 'jscs', 'eslint' ] })
      .on('end', () => {
        expect(tempGen.modules).to.include('jshint');
        expect(tempGen.modules).to.include('jscs');
        expect(tempGen.modules).to.include('eslint');
        done();
      });
  });

  it('Has eslint enabled by default', done => {
    gen
      .on('end', () => {
        expect(tempGen.modules).to.include('eslint');
        done();
      });
  });

  it('Methods can all be disabled', done => {
    gen
      .withPrompts({ lintMethods: [] })
      .on('end', () => {
        expect(tempGen.modules).to.be.empty;
        assert.noFile(expectedFiles);
        assert.noFileContent('package.json', jshint);
        assert.noFileContent('package.json', jscs);
        assert.noFileContent('package.json', eslint);
        assert.noFileContent('package.json', eslintConfig);
        done();
      });
  });

  it('Creates dotfiles', done => {
    gen
      .withPrompts({ lintMethods: [ 'jshint', 'jscs', 'eslint' ] })
      .on('end', () => {
        assert.file(expectedFiles);
        done();
      });
  });

  it('Has some dependencies', done => {

    gen
      .withPrompts({ lintMethods: [ 'jshint', 'jscs', 'eslint' ] })
      .on('end', () => {
        assert.fileContent('package.json', jshint);
        assert.fileContent('package.json', jscs);
        assert.fileContent('package.json', eslint);
        assert.fileContent('package.json', eslintConfig);
        done();
      });
  });

});
