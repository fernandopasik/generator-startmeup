'use strict';

const helpers = require('../helpers');

describe('Initializing', () => {

  let gen, tempGen;

  beforeEach(() => {
    gen = helpers.generator();
  });

  it('creates expected files', done => {
    gen
      .on('ready', generator => {
        tempGen = generator;
        helpers.copyRootPkg(generator);
      })
      .on('end', () => {
        assert.objectContent(tempGen.pkg, { name: 'generator-startmeup' });
        done();
      });
  });

});
