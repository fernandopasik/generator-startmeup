'use strict';

const
  assert = require('yeoman-assert'),
  app = require('../../generators/app');

describe('Init', () => {

  it('can be imported without blowing up', () => {
    assert.ok(app);
  });

});
