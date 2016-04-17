'use strict';

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
    this.copy(this.rootDir + dotfile, dotfile);
  });

};
