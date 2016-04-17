'use strict';

const
  path = require('path'),
  dirs = require('../helpers').dirs,
  yeomanTest = require('yeoman-test');

describe('Ask for app metadata', () => {

  let gen, tempGen;

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
