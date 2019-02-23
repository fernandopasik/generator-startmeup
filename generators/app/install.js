/**
 * Install npm and bower dependencies.
 */
module.exports = function install() {
  /* istanbul ignore if */
  if (!this.options.skipInstall) {
    this.installDependencies();
  }
};
