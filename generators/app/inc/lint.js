'use strict';

var
  path = require('path'),
  rootDir = path.join(__dirname, '../../../');

/**
 * Copy all the dotfiles for the project.
 */
module.exports = function () {

  var dotfiles = [
    '.jscsrc',
    '.jshintignore',
    '.jshintrc'
  ];

  dotfiles.forEach( function (dotfile) {
    this.copy(rootDir + dotfile, dotfile);
  }.bind(this));
};
