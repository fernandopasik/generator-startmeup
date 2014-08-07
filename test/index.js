'use strict';

var
  path = require('path'),
  helpers = require('yeoman-generator').test;

describe('startmeup generator', function () {
  before(function (done) {
    helpers.testDirectory(path.join(__dirname, '../.tmp'),
      function (err) {
        if (err) {
          return done(err);
        }

        this.app = helpers.createGenerator('startmeup:app', [
          '../generators/app'
        ]);
        done();
      }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      // add files you expect to exist here.
      '.bowerrc',
      '.editorconfig',
      '.gitattributes',
      '.gitignore',
      '.jscsrc',
      '.jshintignore',
      '.jshintrc'
    ];

    helpers.mockPrompt(this.app, {
      'someOption': true
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });
});

require('./specs/test-load');
