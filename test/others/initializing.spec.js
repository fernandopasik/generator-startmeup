'use strict';

const
  path = require('path'),
  generator = require('../generator');

describe('Initializing', () => {

  let gen, tempGen;

  beforeEach(() => {
    gen = generator();
  });

  it('creates expected files', done => {
    gen
      .on('ready', generator => {
        tempGen = generator;
        generator.fs.copy(
          path.join(__dirname, '../../package.json'),
          path.join(__dirname, '../../.tmp/package.json')
        );
      })
      .on('end', () => {
        assert.objectContent(tempGen.pkg, { name: 'generator-startmeup' });
        done();
      });
  });

});
