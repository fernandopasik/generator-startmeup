'use strict';

var
  path = require('path'),
  helpers = require('yeoman-generator').test,
  expect = require('chai').expect;

describe('Ask For', function () {

  it('App name', function (done) {
    helpers.mockPrompt(this.app, {
      appName: 'testapp'
    });

    this.app.run({}, function () {
      expect(this.app.appname).to.equal('testapp');
      done();
    }.bind(this));
  });

  it('App name by default is current directory', function (done) {
    helpers.mockPrompt(this.app, {});

    this.app.run({}, function () {
      expect(this.app.appname)
        .to.equal(path.basename(process.cwd()).replace(/^\./, ''));
      done();
    }.bind(this));
  });

});
