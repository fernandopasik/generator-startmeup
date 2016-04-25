'use strict';

/**
 * Copy project initial files.
 */
module.exports = function () {

  this.fs.writeJSON(this.destinationPath('package.json'), this.pkg);
  if (this.pkg.devDependencies.bower) {
    this.template('_bower.json', 'bower.json');
  }
  this.template('README.md');
  this.copy('LICENSE');
};
