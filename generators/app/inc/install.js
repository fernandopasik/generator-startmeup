'use strict';

/**
 * Install npm and bower dependencies.
 */
module.exports = function () {

  /* istanbul ignore if */
  if (!this.options.skipInstall) {
    this.installDependencies();
  }

};
