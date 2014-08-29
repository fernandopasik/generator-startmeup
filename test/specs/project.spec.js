'use strict';

var
  helpers = require('yeoman-generator').test,
  assert = require('yeoman-generator').assert;

describe('Project Creation', function () {

  var name = /\"name\": \"testapp\"/;

  it('creates expected files', function (done) {
    var expected = [
      'package.json',
      'bower.json',
      'app'
    ];

    this.app.run({}, function () {
      assert.file(expected);
      done();
    });

  });

  it('package.json filled template', function (done) {
    helpers.mockPrompt(this.app, {
      appName: 'testapp'
    });

    this.app.run({}, function () {
      assert.fileContent('package.json', name);
      done();
    });
  });

  it('bower.json filled template', function (done) {
    helpers.mockPrompt(this.app, {
      appName: 'testapp'
    });

    this.app.run({}, function () {
      assert.fileContent('bower.json', name);
      done();
    });
  });

});
