module.exports = async function commitLint() {
  this.log('Install commit linting');

  const answers = await this.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      default: true,
      message: 'Do you want to use commit lint with conventional commits format?',
    },
  ]);

  if (answers.confirm) {
    const config = {
      extends: ['@commitlint/config-conventional'],
    };

    this.fs.writeJSON(this.destinationPath('.commitlintrc.json'), config);

    this.devDependencies.push('@commitlint/cli', '@commitlint/config-conventional');
  }
};
