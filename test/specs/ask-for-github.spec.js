'use strict';

const
  dirs = require('../helpers').dirs,
  yeomanTest = require('yeoman-test'),
  assert = require('yeoman-assert'),
  authorName = 'Fernando Pasik',
  githubUsername = 'fernandopasik',
  appName = 'testapp',
  githubUrl = `https://github.com/${githubUsername}/${appName}`;

describe('Ask for Github info', () => {

  let gen;

  beforeEach(() => {
    gen = yeomanTest
      .run(dirs.generator)
      .inDir(dirs.tmp)
      .withOptions({ skipInstall: true });
  });

  it('No?', done => {
    gen
      .withPrompts({ appName, githubConfirm: false })
      .on('end', () => {
        assert.jsonFileContent('package.json', {
          homepage: '',
          bugs: '',
          repository: { type: 'git', url: '' }
        });
        done();
      });
  });

  it('Username', done => {
    gen
      .withPrompts({ appName, githubUsername })
      .on('end', () => {

        assert.jsonFileContent('package.json', {
          homepage: githubUrl,
          bugs: `${githubUrl}/issues`,
          repository: { type: 'git', url: `${githubUrl}.git` }
        });
        done();
      });
  });

  it('Default username from author name', done => {
    gen
      .withPrompts({ appName, authorName })
      .on('end', () => {

        assert.jsonFileContent('package.json', {
          homepage: githubUrl,
          bugs: `${githubUrl}/issues`,
          repository: { type: 'git', url: `${githubUrl}.git` }
        });
        done();
      });
  });

});
