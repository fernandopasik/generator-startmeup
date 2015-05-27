'use strict';

var
  path = require('path'),
  rootDir = path.join(__dirname, '../../../');

module.exports = function () {

  var dotfiles = [
    '.bowerrc',
    '.editorconfig',
    '.gitattributes',
    '.gitignore',
    '.jscsrc',
    '.jshintignore',
    '.jshintrc'
  ];

  dotfiles.forEach( function (dotfile) {
    this.copy(rootDir + dotfile, dotfile);
  }.bind(this));

};
