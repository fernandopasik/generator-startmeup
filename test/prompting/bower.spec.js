'use strict';

const generator = require('../generator');

describe('Ask for Bower use', () => {

  let gen;

  beforeEach(() => {
    gen = generator();
  });

  it('Default No', done => {
    gen
      .on('end', () => {
        assert.noFileContent('package.json',
          /(bower)/);
        done();
      });
  });

  it('Has a dev dependency', done => {
    gen
      .withPrompts({ bowerConfirm: true })
      .on('end', () => {
        assert.fileContent('package.json',
          /bower": "/);
        done();
      });
  });
});
