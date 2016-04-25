'use strict';

/**
 * Ask for Github account info.
 */
module.exports = function () {

  const done = this.async();

  this.prompt([
    {
      name: 'bowerConfirm',
      type: 'confirm',
      default: false,
      message: 'Are you going to use Bower?'
    }
  ], props => {

    if (props.bowerConfirm) {
      this.bower = {};
      this.devDependencies.push({ name: 'bower', version: 'latest' });
      this.dotfiles.push('.bowerrc');
    }

    done();
  });
};
