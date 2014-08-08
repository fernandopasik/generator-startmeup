'use strict';

var helpers = require('yeoman-generator').test;

describe('File Creation', function () {

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

    helpers.assertFile(expected);
    done();
  });

});
