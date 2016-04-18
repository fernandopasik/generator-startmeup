'use strict';

const
  path = require('path'),
  generator = require('../generator');

describe('Ask for app metadata', () => {

  let gen;

  beforeEach(() => {
    gen = generator();
  });

  it('App name', done => {
    gen
      .withPrompts({ appName: 'testapp' })
      .on('end', () => {
        assert.jsonFileContent('package.json', { name: 'testapp' });
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

  it('App description', done => {
    gen
      .withPrompts({ description: 'This is a test App.' })
      .on('end', () => {
        assert.jsonFileContent('package.json', { description: 'This is a test App.' });
        done();
      });
  });

});
