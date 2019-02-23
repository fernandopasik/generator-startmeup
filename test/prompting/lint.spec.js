const helpers = require('../helpers');
const pkg = require('../../package.json');

const expectedFiles = [
  '.eslintrc',
  '.eslintignore',
];

describe('Linting', () => {
  let gen;

  beforeEach(() => {
    gen = helpers.generator();
  });

  it('Available methods is eslint', (done) => {
    gen
      .withPrompts({ lintMethods: ['eslint'] })
      .on('end', () => {
        try {
          assert.fileContent('package.json', /eslint": "\^/);
          assert.fileContent('package.json',
            /eslint-config-fernandopasik": "\^/);
          done();
        } catch (e) {
          done(e);
        }
      });
  });

  it('Has eslint enabled by default', (done) => {
    gen
      .on('end', () => {
        try {
          assert.fileContent('package.json', /eslint": "\^/);
          assert.fileContent('package.json',
            /eslint-config-fernandopasik": "\^/);
          done();
        } catch (e) {
          done(e);
        }
      });
  });

  it('Methods can all be disabled', (done) => {
    gen
      .withPrompts({ lintMethods: [] })
      .on('end', () => {
        try {
          assert.noFile(expectedFiles);
          assert.noJsonFileContent('package.json', {
            devDependencies: {
              eslint: pkg.devDependencies.eslint,
              'eslint-config-fernandopasik':
                pkg.devDependencies['eslint-config-fernandopasik'],
            },
          });
          assert.noFileContent('package.json',
            /(eslint|eslint-config-fernandopasik)/);
          done();
        } catch (e) {
          done(e);
        }
      });
  });

  it('Creates dotfiles', (done) => {
    gen
      .withPrompts({ lintMethods: ['eslint'] })
      .on('end', () => {
        try {
          assert.file(expectedFiles);
          done();
        } catch (e) {
          done(e);
        }
      });
  });

  it('Has some dependencies', (done) => {
    gen
      .withPrompts({ lintMethods: ['eslint'] })
      .on('end', () => {
        try {
          assert.jsonFileContent('package.json', {
            devDependencies: {
              eslint: pkg.devDependencies.eslint,
              'eslint-config-fernandopasik':
                pkg.devDependencies['eslint-config-fernandopasik'],
            },
          });
          done();
        } catch (e) {
          done(e);
        }
      });
  });
});
