'use strict';

const
  path = require('path'),
  rootDir = path.join(__dirname, '../../../'),
  pkg = require(path.join(rootDir, 'package.json'));

/**
 * Copy project initial files.
 */
module.exports = function () {

  this.devDependencies = [];

  this.modules.forEach(module => {
    this.devDependencies.push({
      name: module,
      version: pkg.devDependencies[module]
    });
  });

  this.pkg = pkg;
  this.template('_package.json', 'package.json');
  this.template('_bower.json', 'bower.json');
  this.copy('README.md');
  this.copy('LICENSE');
};
