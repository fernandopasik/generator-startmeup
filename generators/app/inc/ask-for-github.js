'use strict';

/**
 * Ask for Github account info.
 */
module.exports = function () {

  const done = this.async();

  this.pkg = {};

  this.prompt([
    {
      name: 'githubConfirm',
      type: 'confirm',
      default: true,
      message: 'Are you going to use github?'
    },
    {
      name: 'githubUsername',
      message: 'What is your github username?',
      when: props => props.githubConfirm
    }
  ], props => {

    if (props.githubConfirm) {
      this.pkg.githubUsername = props.githubUsername;
      this.pkg.homepage = `https://github.com/${props.githubUsername}/${this.appname}`;
      this.pkg.bugs = `${this.pkg.homepage}/issues`;
      this.pkg.repository = `${this.pkg.homepage}.git`;
    }

    done();
  });
};
