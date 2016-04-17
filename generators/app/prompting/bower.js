'use strict';

/**
 * Ask for Github account info.
 */
module.exports = function () {

  const
    latestVersion = require('latest-version'),
    done = this.async();

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
      latestVersion('bower').then(version => {
        this.devDependencies.push({ name: 'bower', version: `^${version}` });
        done();
      });
    } else {
      done();
    }
  });
};
