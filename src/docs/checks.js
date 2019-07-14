const dependencies = require('../app/dependencies');
const info = require('../app/info.js');

module.exports = function checks() {
  const list = [];
  const { name, githubUsername } = info.answers;

  if (this.fs.exists(this.destinationPath('.circleci/config.yml'))) {
    list.push(`    * [Circle CI](https://circleci.com/gh/${githubUsername}/${name})`);
  }

  if (dependencies.has('codecov')) {
    list.push(`    * [Codecov](https://codecov.io/gh/${githubUsername}/${name})`);
  }

  return list.length > 0 ? list.join('\n') : '';
};
