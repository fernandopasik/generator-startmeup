'use strict';

const
  generator = require('../generator'),
  pkg = require('../../package.json'),
  expectedFiles = [
    '.jscsrc',
    '.jshintignore',
    '.jshintrc',
    '.eslintrc',
    '.eslintignore'
  ];

describe('Linting', () => {

  let gen;

  beforeEach(() => {
    gen = generator();
  });

  it('Available methods are jshint, jscs and eslint', done => {
    gen
      .withPrompts({ lintMethods: [ 'jshint', 'jscs', 'eslint' ] })
      .on('end', () => {
        assert.fileContent('package.json', /jshint": "\^/);
        assert.fileContent('package.json', /jscs": "\^/);
        assert.fileContent('package.json', /eslint": "\^/);
        assert.fileContent('package.json', /eslint-config-fernandopasik": "\^/);
        done();
      });
  });

  it('Has eslint enabled by default', done => {
    gen
      .on('end', () => {
        assert.fileContent('package.json', /eslint": "\^/);
        assert.fileContent('package.json', /eslint-config-fernandopasik": "\^/);
        done();
      });
  });

  it('Methods can all be disabled', done => {
    gen
      .withPrompts({ lintMethods: [] })
      .on('end', () => {
        assert.noFile(expectedFiles);
        assert.noJsonFileContent('package.json', {
          devDependencies: {
            jshint: pkg.devDependencies.jshint,
            jscs: pkg.devDependencies.jscs,
            eslint: pkg.devDependencies.eslint,
            'eslint-config-fernandopasik': pkg.devDependencies['eslint-config-fernandopasik']
          }
        });
        assert.noFileContent('package.json',
          /(jshint|jscs|eslint|eslint-config-fernandopasik)/);
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
        assert.jsonFileContent('package.json', {
          devDependencies: {
            jshint: pkg.devDependencies.jshint,
            jscs: pkg.devDependencies.jscs,
            eslint: pkg.devDependencies.eslint,
            'eslint-config-fernandopasik': pkg.devDependencies['eslint-config-fernandopasik']
          }
        });
        done();
      });
  });

});
