module.exports = async function appMeta(appName) {
  const answers = await this.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      default: true,
      message: 'Are you going to use github?',
    },
    {
      type: 'input',
      name: 'username',
      message: 'What is your github username?',
      default: await this.user.github.username(),
      when: props => props.confirm,
    },
    {
      type: 'input',
      name: 'repo',
      message: 'What is your github repo?',
      default: props => `https://github.com/${props.username}/${appName}`,
      when: props => props.confirm,
    },
  ]);

  let more = {};
  if (answers.repo) {
    more = {
      homepage: answers.repo,
      bugs: `${answers.repo}/issues`,
      url: `${answers.repo}.git`,
    };
  }

  return {
    ...answers,
    ...more,
  };
};
