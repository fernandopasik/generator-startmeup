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
      .withOptions({ 'skip-install': true })
      .on('ready', generator => {
        tempGen = generator;
        done();
      });
  });

  it('By default jshint and jscs are enabled', done => {
    gen
      .on('end', () => {
        expect(tempGen.modules).to.include('jshint');
        expect(tempGen.modules).to.include('jscs');
        done();
      });
  });

  it('All modules can be disabled', done => {
    gen
      .withPrompts({ modules: [] })
      .on('end', () => {
        expect(tempGen.modules).to.be.empty;
        done();
      });
  });

});
