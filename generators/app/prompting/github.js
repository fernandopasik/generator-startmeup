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

    let
      homepage = '',
      bugs = '',
      url = '';

    if (props.githubConfirm) {
      homepage = `https://github.com/${props.githubUsername}/${this.pkg.name}`;
      bugs = `${homepage}/issues`;
      url = `${homepage}.git`;
    }

    Object.assign(this.pkg, { homepage, bugs, repository: { type: 'git', url }});

    done();
  });
};
