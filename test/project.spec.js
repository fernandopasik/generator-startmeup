'use strict';

const
  path = require('path'),
  genDir = path.join(__dirname, '../generators/app'),
  tmpDir = path.join(__dirname, '../.tmp'),
  helpers = require('yeoman-test'),
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
    gen = helpers
      .run(genDir)
      .inDir(tmpDir)
      .withOptions({ 'skip-install': true })
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
          `"author": "${generator.user.git.name()} <${generator.user.git.email()}>"`
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
