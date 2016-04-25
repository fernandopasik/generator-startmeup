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

  // Try to load existing package.json
  this.pkg = Object.assign({ devDependencies: {} },
    this.fs.readJSON(this.destinationPath('package.json'), {}));

  this.dotfiles = [];
  this.rootDir = path.join(__dirname, '../../');
};
