'use strict';

const
  sinon = require('sinon'),
  helpers = require('../helpers'),
  authorName = 'Leonardo da Vinci',
  authorEmail = 'leonardo@davinci.com',
  authorUrl = 'http://davinci.com';

describe('Ask for Author info', () => {

  let gen, stub;

  beforeEach(done => {
    gen = helpers.generator()
      .on('ready', generator => {

        // Emulate when no git repository is present
        stub = {};
        stub.name = sinon.stub(generator.user.git, 'name').returns(null);
        stub.email = sinon.stub(generator.user.git, 'email').returns(null);

        done();
      });
  });

  afterEach(() => {
    // Clean the no git repository emulation
    stub.name.restore();
    stub.email.restore();
  });

  it('Name', done => {
    gen
      .withPrompts({ authorName })
      .on('end', () => {
        try {
          assert.jsonFileContent('package.json', { author: authorName });
          done();
        } catch (e) {
          done(e);
        }
      });
  });

  it('Name and email', done => {
    gen
      .withPrompts({ authorName, authorEmail })
      .on('end', () => {
        try {
          assert.jsonFileContent('package.json',
            { author: `${authorName} <${authorEmail}>` });
          done();
        } catch (e) {
          done(e);
        }
      });
  });

  it('Name and url', done => {
    gen
      .withPrompts({ authorName, authorUrl })
      .on('end', () => {
        try {
          assert.jsonFileContent('package.json',
            { author: `${authorName} (${authorUrl})` });
          done();
        } catch (e) {
          done(e);
        }
      });
  });

  it('Name, email and url', done => {
    gen
      .withPrompts({ authorName, authorEmail, authorUrl })
      .on('end', () => {
        try {
          assert.jsonFileContent('package.json',
            { author: `${authorName} <${authorEmail}> (${authorUrl})` });
          done();
        } catch (e) {
          done(e);
        }
      });
  });

  it('No author name implies no email', done => {
    gen
      .on('end', () => {
        try {
          assert.jsonFileContent('package.json', { author: '' });
          done();
        } catch (e) {
          done(e);
        }
      });
  });

});

describe('Existing Author info', () => {

  let gen;

  beforeEach(() => {
    gen = helpers.generator();
  });

  it('from existing package.json', done => {

    const generatorPkg = require('../../package.json');

    gen
      .on('ready', generator => {
        helpers.copyRootPkg(generator);
      })
      .on('end', () => {
        try {
          assert.jsonFileContent('package.json',
            { author: generatorPkg.author });
          done();
        } catch (e) {
          done(e);
        }
      });
  });

});
