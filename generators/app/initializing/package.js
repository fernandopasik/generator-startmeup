'use strict';

const path = require('path');

/**
 * Start pkg object for npm and bower.
 */
module.exports = function () {
  this.pkg = this.pkg || {};
  this.rootDir = path.join(__dirname, '../../../');
};
