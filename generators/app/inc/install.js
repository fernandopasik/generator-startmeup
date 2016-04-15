'use strict';

/**
 * Install npm and bower dependencies.
 */
module.exports = function () {

  if (!this.options.skipInstall) {
    this.installDependencies();
  }

};
