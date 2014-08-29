'use strict';

module.exports = function () {
  // Launch npm install and bower install
  // at the end of the generator exec
  this.on('end', function () {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  });
};
