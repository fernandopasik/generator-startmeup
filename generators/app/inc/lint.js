/* eslint no-magic-numbers: 0 */
'use strict';

const
  path = require('path'),
  rootDir = path.join(__dirname, '../../../');

/**
 * Copy all the dotfiles for the project.
 */
module.exports = function () {

  const dotfiles = [];

  if (-1 !== this.modules.indexOf('jshint')) {
    dotfiles.push('.jshintignore', '.jshintrc');
  }

  if (-1 !== this.modules.indexOf('jscs')) {
    dotfiles.push('.jscsrc');
  }

  if (-1 !== this.modules.indexOf('eslint')) {
    dotfiles.push('.eslintrc');
  }

  dotfiles.forEach(dotfile => {
    this.copy(rootDir + dotfile, dotfile);
  });
};
