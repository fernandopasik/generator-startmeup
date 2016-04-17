'use strict';

/**
 * Ask for Github account info.
 */
module.exports = function () {

  const done = this.async();
  let githubUsername;

  this.pkg = this.pkg || {};

  if (this.authorName && 'string' === typeof this.authorName) {
    githubUsername = this.authorName.toLowerCase().replace(/\s/g, '');
  }

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
      default: githubUsername,
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
