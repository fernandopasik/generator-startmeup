module.exports = function checks() {
  const list = [];
  const { devDependencies = {} } = this.pkgJson;
  const { appName, githubUsername } = this.answers;

  if (this.fs.exists(this.destinationPath('.circleci/config.yml'))) {
    list.push(`    * [Circle CI](https://circleci.com/gh/${githubUsername}/${appName})`);
  }

  if (devDependencies.codecov) {
    list.push(`    * [Codecov](https://codecov.io/gh/${githubUsername}/${appName})`);
  }

  return list.length > 0 ? list.join('\n') : '';
};
