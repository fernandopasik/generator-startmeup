'use strict';

var
  path = require('path'),
  genDir = path.join(__dirname, '../generators/app'),
  tmpDir = path.join(__dirname, '../.tmp'),
  helpers = require('yeoman-generator').test;

beforeEach(function (done) {
  helpers.testDirectory(tmpDir, function (err) {
    if (err) {
      return done(err);
    }
    this.app = helpers.createGenerator('startmeup:app', [genDir]);
    this.app.options['skip-install'] = true;
    helpers.mockPrompt(this.app, {
      appName: ''
    });
    done();
  }.bind(this));
});

require('./specs/init.spec');
require('./specs/welcome.spec');
require('./specs/askfor.spec.js');
require('./specs/project.spec');
require('./specs/dotfiles.spec');
