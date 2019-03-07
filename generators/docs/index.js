const path = require('path');
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  main() {
    const files = [
      '.github/PULL_REQUEST_TEMPLATE.md',
      '.github/ISSUE_TEMPLATE/bug_report.md',
      '.github/ISSUE_TEMPLATE/feature_request.md',
      'CODE_OF_CONDUCT.md',
    ];

    files.forEach((file) => {
      this.fs.copy(
        path.join(__dirname, '../../', file),
        this.destinationPath(file),
      );
    });
  }
};
