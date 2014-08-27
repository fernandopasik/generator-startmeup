'use strict';

module.exports = function () {
  // Launch npm install and bower install
  // at the end of the generator exec
  this.on('end', function () {
    if (!this.options['skip-install']) {
      this.installDependencies();
    }
  });
};
