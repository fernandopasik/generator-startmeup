const Generator = require('yeoman-generator');
const dependencies = require('../app/dependencies');

const commitLint = require('./commit-lint');
const staged = require('./staged');
const install = require('./install');

module.exports = class extends Generator {
  async main() {
    await commitLint.call(this);
    staged.call(this);
    install.call(this);

    this.yarnInstall(dependencies.getDev(), { dev: true });
  }
};
