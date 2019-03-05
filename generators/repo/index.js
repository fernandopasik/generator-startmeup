const path = require('path');
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  main() {
    const rootDir = path.join(__dirname, '../../');
    const files = [
      '.github/PULL_REQUEST_TEMPLATE.md',
      '.github/ISSUE_TEMPLATE/bug_report.md',
      '.github/ISSUE_TEMPLATE/feature_request.md',
      'CODE_OF_CONDUCT.md',
    ];

    files.forEach((file) => {
      this.fs.copy(
        `${rootDir}${file}`,
        this.destinationPath(file),
      );
    });
  }
};
