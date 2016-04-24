'use strict';

const
  path = require('path'),
  generator = require('../generator'),
  appName = 'testapp',
  description = 'This is a test App.';

describe('Ask for app metadata', () => {

  let gen;

  beforeEach(() => {
    gen = generator();
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

  it('App name from existing package.json', done => {
    gen
      .on('ready', generator => {
        generator.fs.copy(
          path.join(__dirname, '../../package.json'),
          path.join(__dirname, '../../.tmp/package.json')
        );
      })
      .on('end', () => {
        assert.jsonFileContent('package.json', { name: 'generator-startmeup' });
        done();
      });
  });

});
