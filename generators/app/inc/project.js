'use strict';

const
  path = require('path'),
  rootDir = path.join(__dirname, '../../../'),
  pkg = require(path.join(rootDir, 'package.json'));

/**
 * Copy project initial files.
 */
module.exports = function () {

  const devDependencies = [];
  this.devDependencies = '';

  /* istanbul ignore next */
  this.modules = this.modules || [];

  this.modules.forEach(module => {
    devDependencies.push(`\t\t"${module}": "${pkg.devDependencies[module]}"`);
  });

  this.devDependencies = devDependencies.sort().join(',\n');

  if (this.devDependencies) {
    this.devDependencies = `\n${this.devDependencies}\n\t`;
  }

  this.pkg.devDependencies = pkg.devDependencies;
  this.template('_package.json', 'package.json');
  this.template('_bower.json', 'bower.json');
  this.copy('README.md');
  this.copy('LICENSE');
};
