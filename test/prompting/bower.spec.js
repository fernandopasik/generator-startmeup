const helpers = require('../helpers');

describe('Ask for Bower use', () => {
  let gen;

  beforeEach(() => {
    gen = helpers.generator();
  });

  it('Default is No', (done) => {
    gen
      .on('end', () => {
        try {
          assert.noFileContent('package.json',
            /(bower)/);
          assert.noFile('.bowerrc');
          assert.noFile('bower.json');
          done();
        } catch (e) {
          done(e);
        }
      });
  });

  it('Has a dev dependency', (done) => {
    gen
      .withPrompts({ bowerConfirm: true })
      .on('end', () => {
        try {
          assert.fileContent('package.json',
            /bower": "/);
          assert.file('.bowerrc');
          done();
        } catch (e) {
          done(e);
        }
      });
  });
});
