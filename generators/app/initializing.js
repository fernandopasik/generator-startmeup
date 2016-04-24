'use strict';

const
  path = require('path'),
  yosay = require('yosay');

/**
 * Start pkg object for npm and bower.
 */
module.exports = function () {

  // Have Yeoman greet the user.
  this.log(yosay('Welcome to the marvelous StartMeUp generator!'));

  this.pkg = this.pkg || {};
  this.devDependencies = [];
  this.rootDir = path.join(__dirname, '../../');
};
