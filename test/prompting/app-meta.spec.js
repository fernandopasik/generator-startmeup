'use strict';

const
  path = require('path'),
  helpers = require('../helpers'),
  appName = 'testapp',
  description = 'This is a test App.';

describe('Ask for app metadata', () => {

  let gen;

  beforeEach(() => {
    gen = helpers.generator();
  });

  it('App name and description', done => {
    gen
      .withPrompts({ appName, description })
      .on('end', () => {
        assert.jsonFileContent('package.json', { name: appName, description });
        done();
      });
  });

  it('App name by default is current directory', done => {
    gen
      .on('end', () => {
        assert.jsonFileContent('package.json', {
          name: path.basename(process.cwd()).replace(/^\./, '')
        });
        done();
      });
  });

  it('App name and description from existing package.json', done => {

    const generatorPkg = require('../../package.json');

    gen
      .on('ready', generator => {
        helpers.copyRootPkg(generator);
      })
      .on('end', () => {
        assert.jsonFileContent('package.json', {
          name: generatorPkg.name,
          description: generatorPkg.description
        });
        done();
      });
  });

});
