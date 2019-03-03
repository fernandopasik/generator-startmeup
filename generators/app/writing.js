/**
 * Copy project initial files.
 */
module.exports = function writing() {
  this.fs.writeJSON(this.destinationPath('package.json'), this.pkg);
  this.template('README.md');
  this.copy('LICENSE');
};
