'use strict';

const
  generator = require('../generator'),
  expectedFiles = [
    'package.json',
    'bower.json',
    'README.md',
    'LICENSE'
  ],
  appName = 'testapp',
  description = 'This is a test';

describe('Project Creation', () => {

  let gen;

  beforeEach(() => {
    gen = generator()
      .withPrompts({ appName, description });
  });

  it('creates expected files', done => {
    gen
      .on('end', () => {
        assert.file(expectedFiles);
        done();
      });
  });

  it('README contains app name and description', done => {
    gen
      .on('end', () => {
        assert.fileContent('README.md', appName);
        assert.fileContent('README.md', description);
        done();
      });
  });

});
