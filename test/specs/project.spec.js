'use strict';

var assert = require('yeoman-generator').assert;

describe('Project Creation', function () {

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

});
