'use strict';

const path = require('path');

/**
 * Copy project initial files.
 */
module.exports = function () {

  const pkg = require(path.join(this.rootDir, 'package.json'));

  this.devDependencies = this.devDependencies
    .map(dependency => `    "${dependency}": "${pkg.devDependencies[dependency]}"`)
    .sort()
    .join(',\n');

  if (this.devDependencies) {
    this.devDependencies = `\n${this.devDependencies}\n  `;
  }

  this.template('_package.json', 'package.json');
  this.template('_bower.json', 'bower.json');
  this.copy('README.md');
  this.copy('LICENSE');
};
