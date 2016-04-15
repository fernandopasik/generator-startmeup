'use strict';

const
  path = require('path'),
  genDir = path.join(__dirname, '../generators/app'),
  tmpDir = path.join(__dirname, '../.tmp'),
  helpers = require('yeoman-test'),
  expect = require('chai').expect;

describe('Ask For Modules', () => {

  let gen, tempGen;

  beforeEach(done => {
    gen = helpers
      .run(genDir)
      .inDir(tmpDir)
      .withOptions({ skipInstall: true })
      .on('ready', generator => {
        tempGen = generator;
        done();
      });
  });

  it('App name', done => {
    gen
      .withPrompts({ appName: 'testapp' })
      .on('end', () => {
        expect(tempGen.appname).to.equal('testapp');
        done();
      });
  });

  it('App name by default is current directory', done => {
    gen
      .on('end', () => {
        expect(tempGen.appname)
          .to.equal(path.basename(process.cwd()).replace(/^\./, ''));
        done();
      });
  });

  it('App description', done => {
    gen
      .withPrompts({ description: 'This is a test App.' })
      .on('end', () => {
        expect(tempGen.description).to.equal('This is a test App.');
        done();
      });
  });

});
