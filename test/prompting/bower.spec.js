'use strict';

const
  dirs = require('../helpers').dirs,
  yeomanTest = require('yeoman-test'),
  assert = require('yeoman-assert');

describe('Ask for Bower use', () => {

  let gen;

  beforeEach(() => {
    gen = yeomanTest
      .run(dirs.generator)
      .inDir(dirs.tmp)
      .withOptions({ skipInstall: true });
  });

  it('Default No', done => {
    gen
      .on('end', () => {
        assert.noFileContent('package.json',
          /(bower)/);
        done();
      });
  });

  it('Has a dev dependency', done => {
    gen
      .withPrompts({ bowerConfirm: true })
      .on('end', () => {
        assert.fileContent('package.json',
          /bower": "\^/);
        done();
      });
  });
});
