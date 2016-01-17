'use strict';

var
  path = require('path'),
  genDir = path.join(__dirname, '../generators/app'),
  tmpDir = path.join(__dirname, '../.tmp'),
  helpers = require('yeoman-test'),
  expect = require('chai').expect;

describe('Ask For Modules', function () {

  var gen, tempGen;

  beforeEach( function (done) {
    gen = helpers
      .run(genDir)
      .inDir(tmpDir)
      .withOptions({ 'skip-install': true })
      .on('ready', function (generator) {
        tempGen = generator;
        done();
      });
  });

  it('By default jshint and jscs are enabled', function (done) {
    gen
      .on('end', function () {
        expect(tempGen.modules).to.include('jshint');
        expect(tempGen.modules).to.include('jscs');
        done();
      });
  });

  it('All modules can be disabled', function (done) {
    gen
      .withPrompts({ modules: [] })
      .on('end', function () {
        expect(tempGen.modules).to.be.empty;
        done();
      });
  });

});
