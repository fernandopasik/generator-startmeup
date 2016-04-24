'use strict';

const
  app = require('../../generators/app');

describe('Initializing', () => {

  it('can be imported without blowing up', () => {
    assert.ok(app);
  });

});
