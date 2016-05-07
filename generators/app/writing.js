'use strict';

/**
 * Copy project initial files.
 */
module.exports = function () {
  this.fs.writeJSON(this.destinationPath('package.json'), this.pkg);
  this.fs.writeJSON(this.destinationPath('bower.json'), this.bower);
  this.template('README.md');
  this.copy('LICENSE');
};
