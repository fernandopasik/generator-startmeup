'use strict';

/**
 * Ask for Github account info.
 * @returns {Promise} After prompting
 */
module.exports = function () {

  return this.prompt([
    {
      name: 'bowerConfirm',
      type: 'confirm',
      default: false,
      message: 'Are you going to use Bower?'
    }
  ]).then(props => {

    if (props.bowerConfirm) {

      this.bower = Object.assign(
        this.fs.readJSON(this.templatePath('_bower.json'), {}),
        {
          name: this.pkg.name,
          description: this.pkg.description,
          homepage: this.pkg.homepage,
          authors: this.pkg.author,
          repository: { type: 'git', url: this.pkg.repository.url }
        }
      );

      Object.assign(this.pkg.devDependencies, { bower: 'latest' });
      this.dotfiles.push('.bowerrc');
    }
  });
};
