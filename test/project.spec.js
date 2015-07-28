'use strict';

var
  path = require('path'),
  genDir = path.join(__dirname, '../generators/app'),
  tmpDir = path.join(__dirname, '../.tmp'),
  helpers = require('yeoman-generator').test,
  assert = require('yeoman-generator').assert;

describe('Project Creation', function () {

  var
    gen,
    name = /\"name\": \"testapp\"/,
    description = /\"description\": \"This is a test\"/,
    git = {};

  beforeEach( function () {
    gen = helpers
      .run(genDir)
      .inDir(tmpDir)
      .withOptions({ 'skip-install': true })
      .withPrompts({
        appName: 'testapp',
        description: 'This is a test'
      });
  });

  it('creates expected files', function (done) {

    var expected = [
      'package.json',
      'bower.json',
      'README.md',
      'LICENSE'
    ];

    gen.on('end', function () {
      assert.file(expected);
      done();
    });
  });

  it('package.json filled template', function (done) {
    gen
      .on('ready', function (generator) {
        git.user = new RegExp('"name": "' + generator.user.git.name() + '"');
        git.email = new RegExp('"email": "' + generator.user.git.email() + '"');
      })
      .on('end', function () {
        assert.fileContent('package.json', name);
        assert.fileContent('package.json', description);
        assert.fileContent('package.json', git.user);
        assert.fileContent('package.json', git.email);
        done();
      });
  });

  it('bower.json filled template', function (done) {
    gen
      .on('ready', function (generator) {
        git.user = new RegExp('"name": "' + generator.user.git.name() + '"');
        git.email = new RegExp('"email": "' + generator.user.git.email() + '"');
      })
      .on('end', function () {
        assert.fileContent('bower.json', name);
        assert.fileContent('bower.json', description);
        assert.fileContent('bower.json', git.user);
        assert.fileContent('bower.json', git.email);
        done();
      });
  });

});
