/**
 * Ask for Github account info.
 * @returns {Promise} After prompting
 */
module.exports = function github() {
  let suggestedGithubUsername;

  if (this.authorName && typeof this.authorName === 'string') {
    suggestedGithubUsername = this.authorName.toLowerCase().replace(/\s/g, '');
  }

  return this.prompt([
    {
      name: 'githubConfirm',
      type: 'confirm',
      default: true,
      message: 'Are you going to use github?',
    },
    {
      name: 'githubUsername',
      message: 'What is your github username?',
      default: suggestedGithubUsername,
      when: props => props.githubConfirm,
    },
  ]).then((props) => {
    let
      homepage = '';
    let bugs = '';
    let url = '';

    if (props.githubConfirm) {
      homepage = `https://github.com/${props.githubUsername}/${this.pkg.name}`;
      bugs = `${homepage}/issues`;
      url = `${homepage}.git`;
    }

    Object.assign(this.pkg, {
      homepage,
      bugs,
      repository: {
        type: 'git',
        url,
      },
    });
  });
};
