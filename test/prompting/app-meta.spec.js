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

});
