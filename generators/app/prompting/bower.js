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
      Object.assign(this.pkg, { devDependencies: { bower: 'latest' } });
      this.dotfiles.push('.bowerrc');
    }

    done();
  });
};
