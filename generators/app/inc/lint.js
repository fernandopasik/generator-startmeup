'use strict';

var
  path = require('path'),
  rootDir = path.join(__dirname, '../../../');

/**
 * Copy all the dotfiles for the project.
 */
module.exports = function () {

  var dotfiles = [];

  if (this.modules.indexOf('jshint') !== -1) {
    dotfiles.push('.jshintignore', '.jshintrc');
  }

  if (this.modules.indexOf('jscs') !== -1) {
    dotfiles.push('.jscsrc');
  }

  dotfiles.forEach( function (dotfile) {
    this.copy(rootDir + dotfile, dotfile);
  }.bind(this));
};
