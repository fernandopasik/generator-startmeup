'use strict';

/**
 * Ask for Github account info.
 */
module.exports = function () {

  const done = this.async();
  let suggestedGithubUsername;

  if (this.authorName && 'string' === typeof this.authorName) {
    suggestedGithubUsername = this.authorName.toLowerCase().replace(/\s/g, '');
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
      default: suggestedGithubUsername,
      when: props => props.githubConfirm
    }
  ], props => {

    if (props.githubConfirm) {
      this.pkg.homepage = `https://github.com/${props.githubUsername}/${this.appname}`;
      this.pkg.bugs = `${this.pkg.homepage}/issues`;
      this.pkg.repository = `${this.pkg.homepage}.git`;
    }

    done();
  });
};
