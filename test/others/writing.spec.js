const helpers = require('../helpers');
const generatorPkg = require('../../package.json');

const expectedFiles = [
  'package.json',
  'README.md',
  'LICENSE',
];
const appName = 'testapp';
const description = 'This is a test';

describe('Project Creation', () => {
  let gen;

  beforeEach(() => {
    gen = helpers.generator()
      .withPrompts({ appName, description });
  });

  it('creates expected files', (done) => {
    gen
      .on('end', () => {
        try {
          assert.file(expectedFiles);
          done();
        } catch (e) {
          done(e);
        }
      });
  });

  it('README contains app name and description', (done) => {
    gen
      .on('end', () => {
        try {
          assert.fileContent('README.md', appName);
          assert.fileContent('README.md', description);
          done();
        } catch (e) {
          done(e);
        }
      });
  });
});

describe('Existing Project info', () => {
  let gen;

  beforeEach(() => {
    gen = helpers.generator();
  });

  it('from existing package.json', (done) => {
    gen
      .on('ready', (generator) => {
        helpers.copyRootPkg(generator);
      })
      .on('end', () => {
        try {
          assert.jsonFileContent('package.json', generatorPkg);
          done();
        } catch (e) {
          done(e);
        }
      });
  });
});
