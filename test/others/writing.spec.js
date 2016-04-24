'use strict';

const
  helpers = require('../helpers'),
  expectedFiles = [
    'package.json',
    'README.md',
    'LICENSE'
  ],
  appName = 'testapp',
  description = 'This is a test';

describe('Project Creation', () => {

  let gen;

  beforeEach(() => {
    gen = helpers.generator()
      .withPrompts({ appName, description });
  });

  it('creates expected files', done => {
    gen
      .on('end', () => {
        assert.file(expectedFiles);
        done();
      });
  });

  it('creates expected files when bower present', done => {
    gen
      .withPrompts({ bowerConfirm: true })
      .on('end', () => {
        assert.file(expectedFiles.concat('bower.json'));
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
