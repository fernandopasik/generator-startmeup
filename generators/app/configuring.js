'use strict';

/**
 * Copy all the dotfiles for the project.
 */
module.exports = function () {

  this.dotfiles.push('.editorconfig', '.gitattributes', '.gitignore');
  this.dotfiles.forEach(dotfile => {
    this.copy(this.rootDir + dotfile, dotfile);
  });

};
