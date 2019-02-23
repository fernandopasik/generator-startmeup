const helpers = require('../helpers');

const authorName = 'Fernando Pasik';
const githubUsername = 'fernandopasik';
const appName = 'testapp';
const githubUrl = `https://github.com/${githubUsername}/${appName}`;

describe('Ask for Github info', () => {
  let gen;

  beforeEach(() => {
    gen = helpers.generator();
  });

  it('No?', (done) => {
    gen
      .withPrompts({ appName, githubConfirm: false })
      .on('end', () => {
        try {
          assert.jsonFileContent('package.json', {
            homepage: '',
            bugs: '',
            repository: { type: 'git', url: '' },
          });
          done();
        } catch (e) {
          done(e);
        }
      });
  });

  it('Username', (done) => {
    gen
      .withPrompts({ appName, githubUsername })
      .on('end', () => {
        try {
          assert.jsonFileContent('package.json', {
            homepage: githubUrl,
            bugs: `${githubUrl}/issues`,
            repository: { type: 'git', url: `${githubUrl}.git` },
          });
          done();
        } catch (e) {
          done(e);
        }
      });
  });

  it('Default username from author name', (done) => {
    gen
      .withPrompts({ appName, authorName })
      .on('end', () => {
        try {
          assert.jsonFileContent('package.json', {
            homepage: githubUrl,
            bugs: `${githubUrl}/issues`,
            repository: { type: 'git', url: `${githubUrl}.git` },
          });
          done();
        } catch (e) {
          done(e);
        }
      });
  });
});
