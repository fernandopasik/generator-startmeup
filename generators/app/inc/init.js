'use strict';

var yosay = require('yosay');

module.exports = function () {
  // Have Yeoman greet the user.
  this.log(yosay('Welcome to the marvelous StartMeUp generator!'));

  // Launch npm install and bower install
  // at the end of the generator exec
  this.on('end', function () {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  });
};
