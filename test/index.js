'use strict';

var
  path = require('path'),
  helpers = require('yeoman-generator').test;

before(function (done) {

  var tmpDir = path.join(__dirname, '../.tmp');

  helpers.testDirectory(tmpDir, function (err) {
    if (err) {
      return done(err);
    }

    this.app = helpers.createGenerator('startmeup:app', ['../generators/app']);
    this.app.run({}, function () {
      done();
    });
  }.bind(this));
});

require('./specs/test-loading');
require('./specs/test-file-creation');
