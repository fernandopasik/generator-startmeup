const helpers = require('../helpers');

describe('Initializing', () => {
  let gen; let
    tempGen;

  beforeEach(() => {
    gen = helpers.generator();
  });

  it('creates expected files', (done) => {
    gen
      .on('ready', (generator) => {
        tempGen = generator;
        helpers.copyRootPkg(generator);
      })
      .on('end', () => {
        try {
          assert.objectContent(tempGen.pkg, { name: 'generator-startmeup' });
          done();
        } catch (e) {
          done(e);
        }
      });
  });
});
