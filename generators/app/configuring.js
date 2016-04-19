'use strict';

/**
 * Copy all the dotfiles for the project.
 */
module.exports = function () {

  const dotfiles = [
    '.editorconfig',
    '.gitattributes',
    '.gitignore'
  ];

  dotfiles.forEach(dotfile => {
    this.copy(this.rootDir + dotfile, dotfile);
  });

};
