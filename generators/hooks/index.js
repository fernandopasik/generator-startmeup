const path = require('path');
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  main() {
    const rootDir = path.join(__dirname, '../../');
    const files = [
      '.commitlintrc.json',
      '.huskyrc.json',
      '.lintstagedrc',
    ];

    files.forEach((file) => {
      this.fs.copy(
        `${rootDir}${file}`,
        this.destinationPath(file),
      );
    });

    this.yarnInstall([
      '@commitlint/cli',
      '@commitlint/config-conventional',
      'husky',
      'lint-staged',
    ], { dev: true });
  }
};
