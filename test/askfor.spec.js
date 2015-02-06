'use strict';

var
  path = require('path'),
  genDir = path.join(__dirname, '../generators/app'),
  tmpDir = path.join(__dirname, '../.tmp'),
  helpers = require('yeoman-generator').test,
  expect = require('chai').expect;

describe('Ask For', function () {

  var gen, tempGen;

  beforeEach(function () {
    gen = helpers
      .run(genDir)
      .inDir(tmpDir)
      .withOptions({ 'skip-install': true })
      .on('ready', function (generator) {
        tempGen = generator;
      });
  });

  it('App name', function (done) {
    gen
      .withPrompt({ appName: 'testapp' })
      .on('end', function () {
        expect(tempGen.appname).to.equal('testapp');
        done();
      });
  });

  it('App name by default is current directory', function (done) {
    gen
      .on('end', function () {
        expect(tempGen.appname)
          .to.equal(path.basename(process.cwd()).replace(/^\./, ''));
        done();
      });
  });

  it('App description', function (done) {
    gen
      .withPrompt({ description: 'This is a test App.' })
      .on('end', function () {
        expect(tempGen.description).to.equal('This is a test App.');
        done();
      });
  });

});
