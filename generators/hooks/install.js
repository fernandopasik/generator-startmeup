const dependencies = require('../app/dependencies');

module.exports = function install() {
  this.log('Install git hooks');

  const { scripts = {} } = this.pkgJson;

  const config = { hooks: {} };

  if (dependencies.has('@commitlint/cli')) {
    config.hooks['commit-msg'] = 'commitlint -e $GIT_PARAMS';
  }

  if (dependencies.has('lint-staged')) {
    config.hooks['pre-commit'] = 'lint-staged';
  }

  if (scripts.preversion) {
    config.hooks['pre-push'] = 'yarn preversion';
  }

  if (Object.keys(config.hooks).length > 0) {
    this.fs.writeJSON(this.destinationPath('.huskyrc.json'), config);

    dependencies.addDev(['husky']);
  }
};
