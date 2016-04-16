'use strict';

const
  dirs = require('../helpers').dirs,
  yeomanTest = require('yeoman-test'),
  assert = require('yeoman-assert'),
  githubUsername = 'fernandopasik';

describe('Ask for Github info', () => {

  let gen, tempGen, githubUrl;

  beforeEach(done => {
    gen = yeomanTest
      .run(dirs.generator)
      .inDir(dirs.tmp)
      .withOptions({ skipInstall: true })
      .on('ready', generator => {
        tempGen = generator;
        done();
      });
  });

  it('No?', done => {
    gen
      .withPrompts({ githubConfirm: false })
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
      .withPrompts({ githubConfirm: true, githubUsername })
      .on('end', () => {

        githubUrl = `https://github.com/${tempGen.pkg.githubUsername}/${tempGen.appname}`;

        assert.jsonFileContent('package.json', {
          homepage: githubUrl,
          bugs: `${githubUrl}/issues`,
          repository: { type: 'git', url: `${githubUrl}.git` }
        });
        done();
      });
  });

});
