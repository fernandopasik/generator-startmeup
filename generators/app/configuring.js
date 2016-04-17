'use strict';

const
  path = require('path'),
  rootDir = path.join(__dirname, '../../');

/**
 * Copy all the dotfiles for the project.
 */
module.exports = function () {

  const dotfiles = [
    '.bowerrc',
    '.editorconfig',
    '.gitattributes',
    '.gitignore'
  ];

  dotfiles.forEach(dotfile => {
    this.copy(rootDir + dotfile, dotfile);
  });

};
