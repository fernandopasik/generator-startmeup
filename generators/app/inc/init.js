'use strict';

const yosay = require('yosay');

/**
 * Initial salute and dependencies installing.
 */
module.exports = function () {

  const that = this;

  // Have Yeoman greet the user.
  this.log(yosay('Welcome to the marvelous StartMeUp generator!'));

  /**
   * Launch npm install and bower install
   * at the end of the generator exec.
   */
  this.on('end', () => {
    that.installDependencies({
      skipInstall: that.options['skip-install']
    });
  });
};
