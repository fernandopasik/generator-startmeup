'use strict';

const
  path = require('path'),
  yosay = require('yosay');

/**
 * Start pkg object for npm and bower.
 */
module.exports = function () {

  // Try to load existing package.json
  const existingPkg = this.fs.readJSON(this.destinationPath('package.json'), {});

  // Have Yeoman greet the user.
  this.log(yosay('Welcome to the marvelous StartMeUp generator!'));

  if (0 < Object.keys(existingPkg).length) {
    this.pkg = existingPkg;
  } else {
    // If there's no exiting package.json init to empty object
    this.pkg = {};
  }

  this.devDependencies = [];
  this.rootDir = path.join(__dirname, '../../');
};
