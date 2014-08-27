'use strict';

var
  expect = require('chai').expect,
  sinon = require('sinon');

describe('Welcome message', function () {

  beforeEach(function () {
    this.app.log = sinon.spy();
  });

  it('Enabled by default', function (done) {
    this.app.run({}, function () {
      expect(this.app.log.calledWithMatch('Welcome to')).to.be.true;
      done();
    }.bind(this));
  });

  it('Can be disabled', function (done) {
    this.app.options['skip-welcome'] = true;
    this.app.run({}, function () {
      expect(this.app.log.calledWithMatch('Welcome to')).to.be.false;
      done();
    }.bind(this));
  });

});
