'use strict';

var
  helpers = require('yeoman-generator').test,
  assert = require('yeoman-generator').assert;

describe('Project Creation', function () {

  var
    name = /\"name\": \"testapp\"/,
    description = /\"description\": \"This is a test\"/,
    git = {};

  before(function () {
    git.user = new RegExp('"name": "' + this.app.user.git.name() + '"');
    git.email = new RegExp('"email": "' + this.app.user.git.email() + '"');
  });

  it('creates expected files', function (done) {
    var expected = [
      'package.json',
      'bower.json',
      'Gruntfile.js',
      'README.md',
      'LICENSE',
      'app'
    ];

    this.app.run(function () {
      assert.file(expected);
      done();
    });

  });

  it('package.json filled template', function (done) {
    helpers.mockPrompt(this.app, {
      appName: 'testapp',
      description: 'This is a test'
    });

    this.app.run(function () {
      assert.fileContent('package.json', name);
      assert.fileContent('package.json', description);
      assert.fileContent('package.json', git.user);
      assert.fileContent('package.json', git.email);
      done();
    });
  });

  it('bower.json filled template', function (done) {
    helpers.mockPrompt(this.app, {
      appName: 'testapp',
      description: 'This is a test'
    });

    this.app.run(function () {
      assert.fileContent('bower.json', name);
      assert.fileContent('bower.json', description);
      assert.fileContent('bower.json', git.user);
      assert.fileContent('bower.json', git.email);
      done();
    });
  });

  it('Gruntfile.js filled template', function (done) {
    helpers.mockPrompt(this.app, {
      appName: 'testapp',
      description: 'This is a test'
    });

    this.app.run(function () {
      assert.fileContent('Gruntfile.js', /load-grunt-tasks/);
      done();
    });
  });

});
