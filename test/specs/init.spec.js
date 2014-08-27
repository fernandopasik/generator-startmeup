'use strict';

var expect = require('chai').expect;

describe('Import', function () {

  it('can be imported without blowing up', function () {
    var app = require('../../generators/app');
    expect(app).to.exist;
  });

});
