'use strict';

const
  sinon = require('sinon'),
  generator = require('../generator'),
  authorName = 'Leonardo da Vinci',
  authorEmail = 'leonardo@davinci.com',
  authorUrl = 'http://davinci.com';

describe('Ask for Author info', () => {

  let gen, stub;

  beforeEach(done => {
    gen = generator()
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
        assert.jsonFileContent('package.json', { author: authorName });
        done();
      });
  });

  it('Name and email', done => {
    gen
      .withPrompts({ authorName, authorEmail })
      .on('end', () => {
        assert.jsonFileContent('package.json', {
          author: `${authorName} <${authorEmail}>`
        });
        done();
      });
  });

  it('Name and url', done => {
    gen
      .withPrompts({ authorName, authorUrl })
      .on('end', () => {
        assert.jsonFileContent('package.json', {
          author: `${authorName} (${authorUrl})`
        });
        done();
      });
  });

  it('Name, email and url', done => {
    gen
      .withPrompts({ authorName, authorEmail, authorUrl })
      .on('end', () => {
        assert.jsonFileContent('package.json', {
          author: `${authorName} <${authorEmail}> (${authorUrl})`
        });
        done();
      });
  });

  it('No author name implies no email', done => {
    gen
      .on('end', () => {
        assert.jsonFileContent('package.json', { author: '' });
        done();
      });
  });

});
