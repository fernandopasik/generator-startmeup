'use strict';

var yosay = require('yosay');

module.exports = function () {
  // Have Yeoman greet the user.
  if (!this.options['skip-welcome']) {
    this.log(yosay('Welcome to the marvelous StartMeUp generator!'));
  }
};
