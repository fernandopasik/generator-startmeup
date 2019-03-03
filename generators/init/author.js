module.exports = async function appMeta() {
  const answers = await this.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name?',
      default: this.user.git.name(),
    },
    {
      type: 'input',
      name: 'email',
      message: 'What is your email?',
      default: this.user.git.email(),
      when: props => props.name,
    },
    {
      type: 'input',
      name: 'url',
      message: 'What is your url?',
      default: '',
      when: props => props.name,
    },
  ]);

  let full = answers.name;

  if (answers.email) {
    full += ` <${answers.email}>`;
  }

  if (answers.url) {
    full += ` (${answers.url})`;
  }

  return {
    ...answers,
    full,
  };
};
