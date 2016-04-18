'use strict';

const
  generator = require('../generator'),
  expectedFiles = [
    'package.json',
    'bower.json',
    'README.md',
    'LICENSE'
  ];

describe('Project Creation', () => {

  let gen;

  beforeEach(() => {
    gen = generator();
  });

  it('creates expected files', done => {

    gen
      .withPrompts({
        appName: 'testapp',
        description: 'This is a test'
      })
      .on('end', () => {
        assert.file(expectedFiles);
        done();
      });
  });

});
