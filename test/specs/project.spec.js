'use strict';

const
  dirs = require('../helpers').dirs,
  yeomanTest = require('yeoman-test'),
  assert = require('yeoman-assert'),
  expectedFiles = [
    'package.json',
    'bower.json',
    'README.md',
    'LICENSE'
  ];

describe('Project Creation', () => {

  let gen;

  beforeEach(() => {
    gen = yeomanTest
      .run(dirs.generator)
      .inDir(dirs.tmp)
      .withOptions({ skipInstall: true })
      .withPrompts({
        appName: 'testapp',
        description: 'This is a test'
      });
  });

  it('creates expected files', done => {

    gen.on('end', () => {
      assert.file(expectedFiles);
      done();
    });
  });

});
