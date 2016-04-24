'use strict';

const helpers = require('../helpers');

describe('Ask for Bower use', () => {

  let gen;

  beforeEach(() => {
    gen = helpers.generator();
  });

  it('Default is No', done => {
    gen
      .on('end', () => {
        assert.noFileContent('package.json',
          /(bower)/);
        assert.noFile('.bowerrc');
        done();
      });
  });

  it('Has a dev dependency', done => {
    gen
      .withPrompts({ bowerConfirm: true })
      .on('end', () => {
        assert.fileContent('package.json',
          /bower": "/);
        assert.file('.bowerrc');
        done();
      });
  });
});
