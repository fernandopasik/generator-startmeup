'use strict';

const
  helpers = require('../helpers'),
  pkg = require('../../package.json'),
  expectedFiles = [
    '.eslintrc',
    '.eslintignore'
  ];

describe('Linting', () => {

  let gen;

  beforeEach(() => {
    gen = helpers.generator();
  });

  it('Available methods is eslint', done => {
    gen
      .withPrompts({ lintMethods: [ 'eslint' ] })
      .on('end', () => {
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
            eslint: pkg.devDependencies.eslint,
            'eslint-config-fernandopasik': pkg.devDependencies['eslint-config-fernandopasik']
          }
        });
        assert.noFileContent('package.json',
          /(eslint|eslint-config-fernandopasik)/);
        done();
      });
  });

  it('Creates dotfiles', done => {
    gen
      .withPrompts({ lintMethods: [ 'eslint' ] })
      .on('end', () => {
        assert.file(expectedFiles);
        done();
      });
  });

  it('Has some dependencies', done => {

    gen
      .withPrompts({ lintMethods: [ 'eslint' ] })
      .on('end', () => {
        assert.jsonFileContent('package.json', {
          devDependencies: {
            eslint: pkg.devDependencies.eslint,
            'eslint-config-fernandopasik': pkg.devDependencies['eslint-config-fernandopasik']
          }
        });
        done();
      });
  });

});
