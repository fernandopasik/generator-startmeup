'use strict';

var
  path = require('path'),
  rootDir = path.join(__dirname, '../../../');

/**
 * Copy project initial files.
 */
module.exports = function () {

  this.pkg = require(rootDir + 'package.json');
  this.template('_package.json', 'package.json');
  this.template('_bower.json', 'bower.json');
  this.copy('README.md');
  this.copy('LICENSE');
};
