'use strict';

const path = require('path');

/**
 * Copy project initial files.
 */
module.exports = function () {

  const
    devDependencies = [],
    pkg = require(path.join(this.rootDir, 'package.json'));

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
