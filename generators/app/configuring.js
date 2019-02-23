/**
 * Copy all the dotfiles for the project.
 */
module.exports = function configuring() {
  this.dotfiles.push('.editorconfig', '.gitattributes', '.gitignore');
  this.dotfiles.forEach((dotfile) => {
    this.copy(this.rootDir + dotfile, dotfile);
  });
};
