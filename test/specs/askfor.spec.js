'use strict';

var
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

});
