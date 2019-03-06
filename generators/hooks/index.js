const Base = require('../base');

const commitLint = require('./commit-lint');
const staged = require('./staged');
const install = require('./install');

module.exports = class extends Base {
  async main() {
    await commitLint.call(this);
    staged.call(this);
    install.call(this);

    this.yarnInstall(this.devDeps, { dev: true });
  }
};
