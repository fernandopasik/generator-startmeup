'use strict';

const
  dirs = require('../helpers').dirs,
  yeomanTest = require('yeoman-test'),
  assert = require('yeoman-assert'),
  name = /\"name\": \"testapp\"/,
  description = /\"description\": \"This is a test\"/,
  expectedFiles = [
    'package.json',
    'bower.json',
    'README.md',
    'LICENSE'
  ];

describe('Project Creation', () => {

  let gen, author;

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

  it('package.json filled template', done => {
    gen
      .on('ready', generator => {
        author = new RegExp(
          `"author": "${generator.user.git.name()} <${generator.user.git.email()}>"`
        );
      })
      .on('end', () => {
        assert.fileContent('package.json', name);
        assert.fileContent('package.json', description);
        assert.fileContent('package.json', author);
        done();
      });
  });

  it('bower.json filled template', done => {
    gen
      .on('ready', generator => {
        author = new RegExp(
          `"authors": "${generator.user.git.name()} <${generator.user.git.email()}>"`
        );
      })
      .on('end', () => {
        assert.fileContent('bower.json', name);
        assert.fileContent('bower.json', description);
        assert.fileContent('bower.json', author);
        done();
      });
  });

});
