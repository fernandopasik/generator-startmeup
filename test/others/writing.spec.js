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
        try {
          assert.file(expectedFiles);
          done();
        } catch (e) {
          done(e);
        }
      });
  });

  it('creates expected files when bower present', done => {
    gen
      .withPrompts({ bowerConfirm: true })
      .on('end', () => {
        try {
          assert.file(expectedFiles.concat('bower.json'));
          done();
        } catch (e) {
          done(e);
        }
      });
  });

  it('README contains app name and description', done => {
    gen
      .on('end', () => {
        try {
          assert.fileContent('README.md', appName);
          assert.fileContent('README.md', description);
          done();
        } catch (e) {
          done(e);
        }
      });
  });

});

describe('Existing Project info', () => {

  let gen;

  beforeEach(() => {
    gen = helpers.generator();
  });

  it('from existing package.json', done => {

    const generatorPkg = require('../../package.json');

    gen
      .on('ready', generator => {
        helpers.copyRootPkg(generator);
      })
      .on('end', () => {
        try {
          assert.jsonFileContent('package.json', generatorPkg);
          done();
        } catch (e) {
          done(e);
        }
      });
  });

});
