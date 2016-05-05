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
      Object.assign(this.pkg.devDependencies, { bower: 'latest' });
      this.dotfiles.push('.bowerrc');
    }
  });
};
